import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function Deletebtn({onClick}) {
  return (
    <div className='flex gap-1 '>
      
       <Button onClick={onClick} type="text" className="h-[27px] text-[#F22F23] bg-[rgba(242,47,35,0.3)] w-[65px] text-[10px] font-bold">
      <CloseCircleOutlined
       className="text-[15px] text-[#F22F23]"/>
      Delete</Button>
      </div>)
}


// import React from 'react';
// import { CloseCircleOutlined } from '@ant-design/icons';
// import { Button } from 'antd';

// export default function Deletebtn({ onClick, disabled }) {
//   return (
//     <div className='flex gap-1'>
//       <Button onClick={onClick} type="text" disabled={disabled} className="h-[27px] text-[#F22F23] bg-[rgba(242,47,35,0.3)] w-[65px] text-[10px] font-bold">
//         <CloseCircleOutlined className="text-[15px] text-[#F22F23]" /> Delete
//       </Button>
//     </div>
//   );
// }

