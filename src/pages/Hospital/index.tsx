import React from 'react'
import { Card } from 'antd'
import { Outlet } from 'react-router-dom'
export default function Hospital() {
  return (
    <Card>
        <Outlet></Outlet>
    </Card>
  )
}
