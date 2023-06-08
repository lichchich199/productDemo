import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoadingSpinner from './components/common/loading/Loading';


type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export default function Routing({children} : Props) {
  const {loadingStatus} = useSelector((state : RootState) => state.global);
  return (
    <>
      {loadingStatus && <LoadingSpinner/>}
        <div>
             {children}
        </div>
    </>
  )
}
