import React from "react"

export default function BookTags({ data }: { data: any }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}