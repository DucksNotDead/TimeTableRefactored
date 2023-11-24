import React, {useState} from 'react';
import Content from "../../components/flex/Content";
import AppInput from "../../components/UI/AppInput";
import AppDatePicker from "../../components/UI/AppDatePicker";
import FlatCard from "../../components/flex/FlatCard";
import Flex from "../../components/flex/Flex";
import Title from "../../components/text/Title";
import DatePopup from "../../components/popups/DatePopup";

const CreateDay = () => {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState<string[]>(['',''])
    const [timepoints, setTimepoints] = useState([])
    const [error, setError] = useState(null)

    return (
        <Content>
            <Flex padding={0} column gap={"md"}>
                <AppInput
                    value={title}
                    setValue={setTitle}
                    placeholder={'Введите заголовок'}
                />
                <Flex padding={0} gap={"md"}>
                    <FlatCard style={{ flex: 3 }} justify={"center"}>
                        <DatePopup date={date} setDate={setDate}/>
                    </FlatCard>
                    <FlatCard style={{ flex: 4 }} justify={"center"}>

                    </FlatCard>
                </Flex>
            </Flex>
        </Content>
    );
};

export default CreateDay;