import React, {Dispatch, useState} from 'react';
import AppModal from "../UI/AppModal";
import DatePickerNative from "../picker/DatePickerNative";

const DatePopup = ({ date, setDate }: {
    date: string[],
    setDate: Dispatch<string[]>
}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(true)
    return (
        <AppModal title={'Выбрать дату'} buttonProps={{
            label: date.join().length>2? date.join(' ') : 'выбрать дату'
        }} visible={{
            value: modalVisible,
            setter: setModalVisible,
        }}>
            <DatePickerNative date={date} setDate={(value) => {
                setDate(value)
                setModalVisible(false)
            }}/>
        </AppModal>
    );
};

export default DatePopup;