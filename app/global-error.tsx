"use client";

import NextError from "next/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.error("Global Error:", error); // Logging the error to the console

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
