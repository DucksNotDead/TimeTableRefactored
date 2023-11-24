import React, {useState} from 'react';

const CreateTimepoint = () => {

    /*const [day, setDay] = useState(null)
    const [interval, setInterval] = useState([
        ['00', '00'],
        ['00', '00']
    ])
    const parts = useTimeInterval(interval)

    const check = () => {
        if (interval[0].join() === interval[1].join()) {
            notify.err('Пустой временной промежуток')
            return false
        }
        return true
    }

    const save = (title, date, reset) => {
        if (check()) {
            if (DataStore.checkTimepoint(date, interval)) {
                DataStore.save('timepoints', {
                    day: date,
                    interval,
                    title
                })
            }
            else {
                notify.err('Этот промежуток уже занят')
                setInterval([
                    ['00', '00'],
                    ['00', '00']
                ])
            }
        }
    }*/

    return (
        /*<View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 15 }}>
                <SetCreatedDayPopup value={day} setValue={setDay}/>
                <AppButton label={'добавить дела'}/>
            </View>
            <TimeIntervalPicker parts={parts} setInterval={setInterval}/>
        </View>*/
        <></>
    );
};

export default CreateTimepoint;