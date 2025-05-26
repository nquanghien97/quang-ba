import React, { useEffect, useId, useRef, useState } from 'react'
import { Input } from './ui/Input'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateOrder } from '@/services/introductory-order.services';
import { priceCalculator } from '@/utils/priceCalculator';
import { formatCurrency } from '@/utils/formatCurrency';
import Select, { SelectInstance, SingleValue } from 'react-select';
import data from '@/app/data.json'

const schema = yup.object().shape({
  customerName: yup
    .string()
    .required('Họ và tên không được để trống'),
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được để trống'),
  province: yup
    .string()
    .required('Tỉnh/thành phố không được để trống'),
  district: yup
    .string()
    .required('Quận/huyện không được để trống'),
  ward: yup
    .string()
    .required('Phường/xã không được để trống'),
  address: yup
    .string()
    .required('Địa chỉ không được để trống'),
  provinceLabel: yup.string(),
  districtLabel: yup.string(),
  wardLabel: yup.string(),
})

interface Option {
  label: string;
  value: string;
}

interface FormValues {
  customerName: string
  phoneNumber: string
  province: string
  district: string
  ward: string
  address: string
  provinceLabel?: string;
  districtLabel?: string;
  wardLabel?: string;
}

function FormOrder() {

  const [quantity, setQuantity] = useState('1');
  const [isRelatives, setIsRelatives] = useState<boolean>(false)
  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [optionProvinces, setOptionProvinces] = useState<{ label: string, value: string }[]>([]);
  const [optionsDistricts, setOptionsDistricts] = useState<{ label: string, value: string }[]>([]);
  const [optionsWards, setOptionsWards] = useState<{ label: string, value: string }[]>([]);

  const selectProvinceRef = useRef<SelectInstance<Option, false>>(null);
  const selectDistrictRef = useRef<SelectInstance<Option, false>>(null);
  const selectWardRef = useRef<SelectInstance<Option, false>>(null);

  const id = useId();

  useEffect(() => {
    setOptionProvinces(data.map(item => ({ label: item.FullName, value: item.Code })))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      if (newValue === '' || (parseInt(newValue) > 0)) {
        setQuantity(newValue);
      }
    }
  };

  const increment = () => {
    const currentValue = quantity === '' ? 0 : parseInt(quantity);
    setQuantity((currentValue + 1).toString());
  };

  const decrement = () => {
    const currentValue = parseInt(quantity);
    if (currentValue > 1) {
      setQuantity((currentValue - 1).toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (![
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ].includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleBlur = () => {
    if (quantity === '') {
      setQuantity('1');
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const submitData = {
        ...data,
        quantity: Number(quantity),
        isRelatives
      }
      await CreateOrder(submitData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="px-4 max-w-6xl m-auto bg-[url('/bg-form.webp')] md:bg-[length:100%_100%]  bg-center rounded-2xl py-4">
      <div className="text-center rounded-xl py-4">
        <h2 className="text-[#002A9E] font-bold text-3xl uppercase">Thông tin khách hàng</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2">
          <div className="flex gap-2 mb-4">
            <div className="w-full">
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => <Input {...field} placeholder='Họ và tên*' />}
              />
              {errors.customerName && <p className="text-sm text-[red]">{errors.customerName.message}</p>}
            </div>
            <div className="w-full">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => <Input {...field} placeholder='Số điện thoại*' />}
              />
              {errors.phoneNumber && <p className="text-sm text-[red]">{errors.phoneNumber.message}</p>}
            </div>
          </div>
          <div className="flex gap-4 md:flex-row flex-col mb-4">
            <div className="md:w-1/2">
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    ref={selectProvinceRef}
                    options={optionProvinces}
                    instanceId={id}
                    placeholder="Tỉnh/Thành phố*"
                    className="w-full"
                    getOptionLabel={(option: Option) => option.label}
                    getOptionValue={(option: Option) => option.value}
                    value={optionProvinces.find((opt) => opt.value === field.value)} // Set the value correctly
                    onChange={async (selectedOption: SingleValue<Option>) => {
                      field.onChange(selectedOption ? selectedOption.value : "")
                      const provinceId = selectedOption?.value;
                      selectDistrictRef.current?.clearValue();
                      selectWardRef.current?.clearValue();
                      setValue('provinceLabel', selectedOption ? selectedOption.label : "")
                      if (provinceId) {
                        setOptionsDistricts(data.flatMap(item => item.District.filter(item1 => item1.ProvinceCode === provinceId)).map(item3 => ({ label: item3.FullName, value: item3.Code })));
                      }
                    }
                    }
                  />
                )}
              />
              {errors.province && <span className="text-[red] text-xs p-2">{errors.province.message}</span>}
            </div>
            <div className="md:w-1/2">
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    ref={selectDistrictRef}
                    options={optionsDistricts}
                    instanceId={id}
                    placeholder="Quận/Huyện*"
                    className="w-full"
                    getOptionLabel={(option: Option) => option.label}
                    getOptionValue={(option: Option) => option.value}
                    value={optionsDistricts?.find((opt) => opt.value === field.value)} // Set the value correctly
                    onChange={async (selectedOption: SingleValue<Option>) => {
                      field.onChange(selectedOption ? selectedOption.value : "")
                      setValue('districtLabel', selectedOption ? selectedOption.label : "")
                      const districtId = selectedOption?.value;
                      selectWardRef.current?.clearValue();
                      if (districtId) {
                        setOptionsWards(data.flatMap(item => item.District.flatMap(item1 => item1.Ward?.filter(item2 => item2.DistrictCode === districtId))).filter(item4 => item4 !== undefined).flatMap(item3 => ({ label: item3.FullName, value: item3.Code })));
                      }
                    }
                    }
                  />
                )}
              />
              {errors.district && <span className="text-[red] text-xs p-2">{errors.district.message}</span>}
            </div>
            <div className="md:w-1/2">
              <Controller
                name="ward"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    ref={selectWardRef}
                    options={optionsWards}
                    instanceId={id}
                    placeholder="Phường/Xã*"
                    className="w-full"
                    getOptionLabel={(option: Option) => option.label}
                    getOptionValue={(option: Option) => option.value}
                    value={optionsWards.find((opt) => opt.value === field.value)} // Set the value correctly
                    onChange={(selectedOption: SingleValue<Option>) => {
                      setValue('wardLabel', selectedOption ? selectedOption.label : "")
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                    }
                  />
                )}
              />
              {errors.ward && <span className="text-[red] text-xs p-2">{errors.ward.message}</span>}
            </div>
          </div>
          <div className="mb-2">
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} placeholder='Địa chỉ (Số nhà, tên đường)*' />}
            />
            {errors.address && <p className="text-sm text-[red]">{errors.address.message}</p>}
          </div>
        </div>
        <div className="flex">
          <div>
            <Image src="/hop.webp" alt="hop" width={200} height={200} />
          </div>
          <div>
            <p className="text-[#002A9E] font-semibold mb-2">Sữa wowtop - Nhập khẩu nguyên lon từ New ZeaLand</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={decrement}
                className="w-8 h-8 flex text-[#002A9E] font-bold items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                type="button"
              >
                -
              </button>

              <input
                type="text"
                value={quantity}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="w-16 text-center text-[#002A9E] font-bold border rounded-md focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={increment}
                className="w-8 h-8 flex text-[#002A9E] font-bold items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                type="button"
              >
                +
              </button>
            </div>
            <div className="flex gap-2 text-[#002A9E] items-center">
              <p className="font-semibold">Khách hàng là người thân</p>
              <div className={`rounded-xl px-4 py-1 font-bold cursor-pointer ${isRelatives === true ? 'bg-[#002A9E] text-white' : 'bg-[#ccc] text-[#929292]'}`} onClick={() => setIsRelatives(true)}>Có</div>
              <div className={`rounded-xl px-4 py-1 font-bold cursor-pointer ${isRelatives === false ? 'bg-[#002A9E] text-white' : 'bg-[#ccc] text-[#929292]'}`} onClick={() => setIsRelatives(false)}>Không</div>
            </div>
            <p className="text-[#002A9E] my-2">Tổng giá trị sản phẩm khách hàng trả: <strong>{formatCurrency(priceCalculator(Number(quantity)).value)}</strong></p>
            <p className="text-[#002A9E] my-2">Phí vận chuyển: <strong>Miễn phí</strong></p>
            <div className="bg-[#FFFFD3] py-1 rounded-xl px-2">
              <p className="text-[#002A9E] my-2">Tổng: <strong>{formatCurrency(priceCalculator(Number(quantity)).value)}</strong></p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type='submit' className="px-4 py-2 text-white bg-[#002A9E] rounded-xl uppercase font-semibold hover:opacity-80 duration-300">Đặt đơn hàng</button>
        </div>
      </form>
    </div>
  )
}

export default FormOrder