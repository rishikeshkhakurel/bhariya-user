import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loading from '../loading/LoadingComp'

const SapRoutes=(Component)=>(props)=> (
    <Suspense fallback={<Loading/>}>
        <Component {...props}/>
    </Suspense>
  )

export default SapRoutes