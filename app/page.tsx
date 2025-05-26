'use client'
import FormOrder from "@/components/FormOrder";
import TopRank from "@/components/TopRank";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/auth.stores";
import { TYPE_RANK } from "@/types/ranks";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import withAuth from "@/hocs/withAuth";
import { GetRevenueByMonth } from "@/services/introductory-order.services";
import { ListRevenueByMonth } from "@/dto/introductory-order.dto";
import { formatCurrency } from "@/utils/formatCurrency";

const Home = () => {

  const { me } = useAuthStore();
  const router = useRouter()
  const [listRevenueByMonth, setListRevenueByMonth] = useState<ListRevenueByMonth[]>()
  
  useEffect(() => {
    document.title = 'Quảng bá'
  }, [])

  const logOut = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  useEffect(() => {
    (async () => {
      try {
      const res = await GetRevenueByMonth({ month: 5, year: 2025 })
      setListRevenueByMonth(res.data)
    } catch (err) {
      console.log(err)
    }
    })()
  }, [])

  const top4_10 = listRevenueByMonth?.slice(3, listRevenueByMonth.length)

  return (
    <div className="max-w-6xl m-auto">
      <div className="bg-[url('/bgr.jpg')] bg-[length:100%_100%]">
        <div className="relative mb-2">
          <Image src="/title.png" alt="title" width={600} height={200} className="m-auto" />
          <Button className="absolute top-1/2 -translate-y-1/2 right-4" onClick={logOut} variant="primary">Đăng xuất</Button>
        </div>
        <p className="gradient-text text-2xl font-semibold text-center mb-4">CHIA SẺ TỪ TÂM - VƯỢT TẦM THU NHẬP</p>
        <div className="flex max-lg:flex-col justify-around gap-2 p-4">
          <div className="lg:w-1/2">
            <div className="flex justify-center">
              <TopRank typeRank={TYPE_RANK.rank1} width={300} height={300} data={listRevenueByMonth?.[0]} />
            </div>
            <div className="flex justify-around max-md:flex-col">
              <TopRank typeRank={TYPE_RANK.rank2} width={240} height={240} data={listRevenueByMonth?.[1]} />
              <TopRank typeRank={TYPE_RANK.rank3} width={240} height={240} data={listRevenueByMonth?.[2]} />
            </div>
          </div>
          <div className="lg:w-1/2">
          {(top4_10 && top4_10.length !== 0) ? (
            <ul className="w-full">
              {top4_10.map((data, index) => (
                <li key={index} className={`flex justify-around py-1 my-2 ${index % 2 !== 0 ? '' : 'bg-item'}`}>
                  <p className="gradient-text font-bold">{`${index + 4}. ${data.username} - ${data.fullName}`}</p>
                  <p className="gradient-text font-bold">{data.commission}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-white py-4">Không có dữ liệu</p>
          )}
            <div>
              <div className="gradient py-2 text-center rounded-t-xl">
                <span className="text-[#002A9E] font-bold text-xl">VỊ TRÍ CỦA BẠN</span>
              </div>
              <div className={`flex justify-around py-2 bg-item`}>
                <p className="gradient-text font-bold">{`${me?.revenue_by_month.rank}. ${me?.username} - ${me?.fullName}`}</p>
                <p className="gradient-text font-bold">{`${me?.revenue_by_month.commission}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/bgr2.jpg')] bg-[length:100%_100%] flex max-lg:flex-col gap-2 lg:p-8">
        <div className="lg:w-2/3">
          <FormOrder />
        </div>
        <div className="lg:w-1/3">
          <div>
            <div className="gradient py-2 text-center rounded-xl">
              <span className="text-[#002A9E] font-bold text-xl">Thông tin người dùng</span>
            </div>
            <div>
              <p className="text-[#002A9E] my-2">Họ tên CBNV: <strong>{me?.fullName}</strong></p>
              <p className="text-[#002A9E] my-2">Mã số nhân viên: <strong>{me?.username}</strong></p>
              <p className="text-[#002A9E] my-2">Cộng đồng: <strong>{me?.community || 'Chưa có thông tin'}</strong></p>
              <p className="text-[#002A9E] my-2">Số điện thoại: <strong>{maskPhoneNumber(me?.phoneNumber)}</strong></p>
            </div>
          </div>
          <div>
            <div className="gradient py-2 text-center rounded-xl">
              <span className="text-[#002A9E] font-bold text-xl">Doanh số</span>
            </div>
            <div>
              <p className="text-[#002A9E] my-2">Hôm nay: <strong>{formatCurrency(me?.todayRevenue || 0)}</strong></p>
              <p className="text-[#002A9E] my-2">Tháng này: <strong>{formatCurrency(me?.revenue_by_month.totalRevenue || 0)}</strong></p>
              <p className="text-[#002A9E] my-2">Hoa hồng tháng này: <strong>{formatCurrency(me?.revenue_by_month.commission || 0)}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HomeWithAuth = withAuth(Home)

export default HomeWithAuth
