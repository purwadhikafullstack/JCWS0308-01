'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IOrder } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react"
import CancelOrder from "./CancelOrder"
import { formatToIDR, getUserClientSide } from "@/lib/utils"
import ChangeToShipped from "./ChangeToShipped"
import ConfirmShipped from "./ConfirmShipped"
import { DateRange } from "react-day-picker"

type OrderProps = {
  orderList: IOrder[] | null
  setOrderList: (value: IOrder[] | null) => void
  currentPage: string | null
  date: DateRange
}

export default function OrderTable({ orderList, setOrderList, currentPage, date }: OrderProps) {
  const [user, setUser] = useState(null)
  const getUser = async () => {
    const data = await getUserClientSide()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <Table className="my-7">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Invoice Id</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Payment Status</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList && orderList.map((item) => (
          <TableRow className="p-2" key={item.id}>
            <TableCell className="font-semibold max-w-44 truncate">{item.id}</TableCell>
            <TableCell className="flex items-center gap-2 text-center">
              {!user && item.status === "SHIPPED" && (
                <div className="flex flex-row gap-2 items-center">
                  <p>{item.status}</p>
                </div>
              )}
              {user && item.status === "SHIPPED" && (
                <div className="flex flex-row gap-2 items-center">
                  <p>{item.status}</p>
                  <ConfirmShipped orderId={item.id} setOrderList={setOrderList} currentPage={currentPage} date={date} />
                </div>
              )}
              {item.status !== "SHIPPED" && "PROCESSED" && (
                <p>{item.status}</p>
              )}
              {item.status === 'PROCESSED' && (
                <div className="flex gap-2 items-center">
                  {user ? (
                    <CancelOrder orderId={item.id} setOrderList={setOrderList} currentPage={currentPage} date={date} />
                  ) : (
                    <>
                      <ChangeToShipped orderId={item.id} setOrderList={setOrderList} currentPage={currentPage} date={date} />
                      <CancelOrder orderId={item.id} setOrderList={setOrderList} currentPage={currentPage} date={date} />
                    </>

                  )}
                </div>
              )}

            </TableCell>
            <TableCell className="text-center">{item.status === 'CANCELLED' ? `REFUND` : `${item.paymentStatus}`}</TableCell>
            <TableCell className="text-center">{formatToIDR(item.totalAmount)}</TableCell>
            <TableCell className={`text-center ${item.status === 'CANCELLED' ? `text-red-500` : ''}`}>
              {item.status === 'CANCELLED' ? `canceled` : (<Link href={`/order/${item.id}`} className="underline hover:text-[12px] transition-all">Detail</Link>)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
