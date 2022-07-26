import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.20.7/antd.min.css"
          integrity="sha512-exMGaq8LMVdQCbmOF4zHU4hdrU7Hc6jmgHGawmIe1GcFso9ddZts1pJ6Wo+ZZhHKdEvr6CiiC1YfkrIr9u0N+w=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}