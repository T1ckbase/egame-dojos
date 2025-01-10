import { Head } from '$fresh/runtime.ts';

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
        <link rel='stylesheet' href='static/404.css' />
      </Head>
      <div class='background-emoji'>😱</div>
      <div class='content'>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <a href='/' class='button'>Go Home</a>
      </div>
    </>
  );
}
