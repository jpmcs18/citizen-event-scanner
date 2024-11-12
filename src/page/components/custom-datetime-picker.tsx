import { useEffect, useRef, useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';
import CustomDropdown from './custom-dropdown';
import { current } from '@reduxjs/toolkit';
type DateTimePickerType = 'date' | 'time' | 'datetime-local';
export default function CustomDateTimePicker({
  title,
  subTitle,
  name,
  id,
  className,
  value,
  onChange,
  required,
  readonly,
}: {
  title?: string;
  subTitle?: string;
  name?: string;
  type?: DateTimePickerType;
  id?: string;
  className?: string;
  value?: Date;
  readonly?: boolean | false;
  disabled?: boolean | false;
  placeholder?: string | undefined;
  onChange?: (data: CustomReturn) => void;
  required?: boolean;
}) {
  const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const [years, setYears] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const month = useRef<number | undefined>();
  const day = useRef<number | undefined>();
  const year = useRef<number | undefined>();

  useEffect(
    () => {
      if (value) {
        const date = new Date(value);
        month.current = date.getMonth() + 1;
        day.current = date.getDate();
        year.current = date.getFullYear();
      } else {
        month.current = undefined;
        day.current = undefined;
        year.current = undefined;
      }
      recomputeDay();
    },
    //eslint-disable-next-line
    [value]
  );

  useEffect(
    () => {
      const firstYear = new Date().getFullYear();
      const lastYear = 1900;
      for (let x = firstYear; x > lastYear; x--) {
        setYears((year) => {
          return [...year!, x];
        });
      }
      return () => {
        setYears(() => []);
      };
    },
    //eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      if (!year.current && !month.current) {
        let firstDay = new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate();

        const lastDay = 1;
        for (let d = firstDay; d >= lastDay; d--) {
          setDays((day) => {
            return [...day!, d];
          });
        }
      }
      return () => {
        setDays(() => []);
      };
    },
    //eslint-disable-next-line
    []
  );

  function recomputeDay() {
    setDays(() => []);
    const firstDay = new Date(
      year.current ?? new Date().getMonth(),
      month.current ?? new Date().getMonth() + 1,
      0
    ).getDate();
    const lastDay = 1;
    for (let d = firstDay; d >= lastDay; d--) {
      setDays((day) => {
        return [...day!, d];
      });
    }
    if (firstDay < (day?.current ?? 0)) {
      day.current = undefined;
    }
  }

  function onDateChange() {
    if (day.current && month.current && year.current) {
      onChange?.({
        elementName: name ?? '',
        value: new Date(
          year.current ?? 0,
          (month.current ?? 0) - 1,
          day.current ?? 0
        ),
      });
    }
  }

  return (
    <div className={'custom-input ' + (required && !value) + className}>
      {title && (
        <label className='input-title' htmlFor={name}>
          {title}
        </label>
      )}
      {subTitle && (
        <label className='input-subtitle' htmlFor={name}>
          {subTitle}
        </label>
      )}
      <div className='date-picker'>
        <CustomDropdown
          title='Month'
          selectorOnly={true}
          value={month.current}
          readonly={readonly}
          required={required}
          onChange={(ret) => {
            month.current = ret.value;
            recomputeDay();
            onDateChange();
          }}
          itemsList={months.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
        <CustomDropdown
          title='Day'
          selectorOnly={true}
          value={day.current}
          readonly={readonly}
          required={required}
          onChange={(ret) => {
            day.current = ret.value;
            recomputeDay();
            onDateChange();
          }}
          itemsList={days.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
        <CustomDropdown
          title='Year'
          selectorOnly={true}
          value={year.current}
          readonly={readonly}
          required={required}
          onChange={(ret) => {
            year.current = ret.value;
            recomputeDay();
            onDateChange();
          }}
          itemsList={years.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
      </div>
    </div>
  );
}
