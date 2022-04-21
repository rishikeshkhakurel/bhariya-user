import React, { Suspense } from 'react'
import Loading from '../loading/LoadingComp'

const SapRoutes=(Component)=>(props)=> (
    <Suspense fallback={<Loading/>}>
        <Component {...props}/>
    </Suspense>
  )

export default SapRoutes