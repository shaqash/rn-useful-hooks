import * as React from 'react';

export type Event = React.SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;
export type ModeType = 'date' | 'time';
export interface DateState {
  date: Date;
  mode: ModeType;
  show: boolean;
  showDatepicker: () => void;
  showTimepicker: () => void;
  onChangeDate: (event: Event, selectedDate: Date | undefined) => void;
}

export default function useDate(validation: (date: Date | undefined) => Array<string>): DateState {
  const [date, setDate] = React.useState<Date>(new Date());
  const [mode, setMode] = React.useState<ModeType>('date');
  const [show, setShow] = React.useState<boolean>(false);

  const onChange = (event: Event, selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || date;
    setShow(false);
    try {
      validation(selectedDate);
      setDate(currentDate);
    } catch (error) {
      alert(error);
    }
  };

  const showMode = (currentMode: ModeType): void => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (): void => {
    showMode('date');
  };

  const showTimepicker = (): void => {
    showMode('time');
  };

  return {
    date, mode, show, showDatepicker, showTimepicker, onChangeDate: onChange,
  };
}
