import { randomIntegerBetween } from '@std/random';
import { connectDB } from '../utils/db.ts';
import { Dojo, DojoRandom, DojoView, DojoWithImage } from '../types/egame.ts';
import { AnyBulkWriteOperation } from 'mongodb';

const JSESSIONID = Deno.env.get('JSESSIONID')!;
const egameId = Deno.env.get('EGAMEID')!;

class EGameApi {
  private readonly jSessionId: string;
  private readonly egameId: string;
  private readonly baseUrl: string;

  constructor(jSessionId: string, egameId: string, baseUrl = 'https://ap11.egame.kh.edu.tw') {
    this.jSessionId = jSessionId;
    this.egameId = egameId;
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(path: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          'Cookie': `JSESSIONID=${this.jSessionId}; egameId=${this.egameId}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseClone = response.clone();

      try {
        const jsonData = await response.json();

        if (
          jsonData === null || jsonData === undefined ||
          (typeof jsonData === 'object' && Object.keys(jsonData).length === 0)
        ) {
          console.warn('Received an empty JSON response');
          const textData = await responseClone.text();
          if (!textData) {
            throw new Error('The response content is empty');
          }
          return textData as T;
        }

        return jsonData;
      } catch (_parseError) {
        const textData = await responseClone.text();
        if (!textData) {
          throw new Error('Unable to parse the response content');
        }
        return textData as T;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Request failed: ${path} - ${errorMessage}`);
    }
  }

  private async makeImageRequest(path: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          'Cookie': `JSESSIONID=${this.jSessionId}; egameId=${this.egameId}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Image request failed, status code: ${response.status}`);
      }

      const imageData = await response.text();
      if (!imageData) {
        throw new Error('Received empty image data');
      }

      return imageData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get the image: ${path} - ${errorMessage}`);
    }
  }

  async getDojoCount() {
    const dojoRandom = await this.makeRequest<DojoRandom>('/auth/main/?a=dojoRandom&dojoScope=all');
    return dojoRandom.dojoNumList.reduce((acc, state) => acc + state.count, 0);
  }

  async getDojo(id: number) {
    return await this.makeRequest<DojoView>(`/auth/main/?a=dojoView&dojoSn=${id}`);
  }

  async getDojoImage(y: number | string, sn: number | string): Promise<string> {
    try {
      const base64Image = await this.makeImageRequest(`/auth/main/?a=dojoImg&y=${y}&sn=${sn}`);
      return base64Image;
    } catch (error) {
      console.error('Failed to obtain the dojo image:', error);
      throw error;
    }
  }
}

export async function updateDojos() {
  const eGameApi = new EGameApi(JSESSIONID, egameId, `https://ap${randomIntegerBetween(8, 11)}.egame.kh.edu.tw`);
  const c = await eGameApi.getDojoCount();
  console.log('武館數量:', c);
  const dojoData: DojoWithImage[] = [];
  for (let i = 0; i < c; i++) {
    try {
      const dojoView = await eGameApi.getDojo(i);
      const dojo = dojoView.dojo as DojoWithImage;
      console.log('武館:', dojo._id);
      const image = await eGameApi.getDojoImage(dojo.y, dojo._id);
      // console.log('Image:', image);
      dojo.image = image;
      dojoData.push(dojo);
    } catch {}
  }

  const db = await connectDB();
  const collection = db.collection<DojoWithImage>('dojos');

  const bulkOps: AnyBulkWriteOperation<DojoWithImage>[] = dojoData.map((dojo) => ({
    updateOne: {
      filter: { _id: dojo._id },
      update: { $set: dojo },
      upsert: true,
    },
  }));

  const result = await collection.bulkWrite(bulkOps);
  console.log(`匹配的文檔數: ${result.matchedCount}`);
  console.log(`修改的文檔數: ${result.modifiedCount}`);
  console.log(`插入的文檔數: ${result.upsertedCount}`);
}
