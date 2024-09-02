import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { PlanTemplate } from '../../component/PlanTemplate';

export const MyPlans = () => {
    const location = useLocation();
    const { plans } = location.state;
    const { idx } = useParams();


  return (
    <>
        <PlanTemplate put={true} plans={plans} idx={idx}/>
    </>
  )
}
