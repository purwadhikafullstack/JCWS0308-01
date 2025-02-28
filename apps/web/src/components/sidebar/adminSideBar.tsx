'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { PiListBold } from 'react-icons/pi';
import AdminDashboardContent from './AdminDashboardContent';
import { IAdmin } from '@/app/(dashboard)/admins/admins/_components/columns';

export const AdminSideBar = ({ admin }: { admin: IAdmin | null }) => {
    const pathname = usePathname()
    const [activeButton, setActiveButton] = useState('overviews')

    useEffect(() => {
          const route = pathname.split('/')
          const currentPage = route[2]
          setActiveButton(currentPage)
    }, [pathname]);

    return (
        <>
        <div className='hidden p-6 lg:flex w-80 flex-col justify-between border-r-2 h-screen'>
            <AdminDashboardContent admin={admin && admin} activeButton={activeButton} />
        </div>
        <div className='lg:hidden '>
            <Sheet>
                <SheetTrigger className='lg:hidden z-10 absolute sm:top-8 sm:right-8 top-4 right-4 '>
                    <PiListBold className='bg-white/55 rounded-full p-1' fill='black' size={`1.7rem`} />
                </SheetTrigger>
                <SheetContent className='lg:hidden flex flex-col justify-between rounded-tl-2xl rounded-bl-2xl' side={'right'}>
                    <AdminDashboardContent admin={admin && admin} activeButton={activeButton} />
                </SheetContent>
            </Sheet>
        </div>
        </>
    );
};
