import React from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export default function Routing({children} : Props) {
  return (
    <>
        <div>
             {children}
        </div>
    </>
  )
}
