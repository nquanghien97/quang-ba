'use client'
import FormOrder from "@/components/FormOrder";
import ImageRank from "@/components/ImageRank";
import { useAuthStore } from "@/stores/auth.stores";
import { TYPE_RANK } from "@/types/ranks";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import Image from "next/image";
import { useEffect } from "react";

const fakeData = [
  {
    username: 'W124',
    fullName: 'Nguyễn Văn A',
    commission: 50000
  },
  {
    username: 'W125',
    fullName: 'Nguyễn Văn B',
    commission: 45000
  },
  {
    username: 'W126',
    fullName: 'Nguyễn Văn C',
    commission: 40000
  },
  {
    username: 'W127',
    fullName: 'Nguyễn Văn D',
    commission: 35000
  },
  {
    username: 'W128',
    fullName: 'Nguyễn Văn E',
    commission: 30000
  },
  {
    username: 'W129',
    fullName: 'Nguyễn Văn F',
    commission: 25000
  },
  {
    username: 'W130',
    fullName: 'Nguyễn Văn F',
    commission: 20000
  }
]

export default function Home() {

  const { me } = useAuthStore();
  
  useEffect(() => {
    document.title = 'Quảng bá'
  }, [])

  return (
    <div className="max-w-6xl m-auto">
      <div className="bg-[url('/bgr.jpg')] bg-[length:100%_100%]">
        <Image src="/title.png" alt="title" width={600} height={200} className="m-auto mb-2" />
        <p className="gradient-text text-2xl font-semibold text-center mb-4">CHIA SẺ TỪ TÂM - VƯỢT TẦM THU NHẬP</p>
        <div className="flex max-lg:flex-col justify-around gap-2 p-4">
          <div className="lg:w-1/2">
            <div className="flex justify-center">
              <ImageRank typeRank={TYPE_RANK.rank1} width={300} height={300} />
            </div>
            <div className="flex justify-around max-md:flex-col">
              <ImageRank typeRank={TYPE_RANK.rank2} width={240} height={240} />
              <ImageRank typeRank={TYPE_RANK.rank3} width={240} height={240} />
            </div>
          </div>
          <div className="lg:w-1/2">
            <ul className="w-full">
              {fakeData.map((data, index) => (
                <li key={index} className={`flex justify-around py-1 my-2 ${index % 2 !== 0 ? '' : 'bg-item'}`}>
                  <p className="gradient-text font-bold">{`${index + 4}. ${data.username} - ${data.fullName}`}</p>
                  <p className="gradient-text font-bold">{data.commission}</p>
                </li>
              ))}
            </ul>
            <div>
              <div className="gradient py-2 text-center rounded-t-xl">
                <span className="text-[#002A9E] font-bold text-xl">VỊ TRÍ CỦA BẠN</span>
              </div>
              <div className={`flex justify-around py-2 bg-item`}>
                <p className="gradient-text font-bold">{`20. W123 - Nguyễn Thị B`}</p>
                <p className="gradient-text font-bold">{`10000`}</p>
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
              <p className="text-[#002A9E] my-2">Hôm nay: <strong>2.400.000 VNĐ</strong></p>
              <p className="text-[#002A9E] my-2">Tháng này: <strong>12.400.000 VNĐ</strong></p>
              <p className="text-[#002A9E] my-2">Hoa hồng tháng này: <strong>2.480.000 VNĐ</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
