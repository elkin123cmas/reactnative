import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Text, View, StyleSheet } from 'react-native';

// Definimos las interfaces para el estado y las funciones
interface AppState {
    date: Date;
    mode: 'date' | 'time';
    show: boolean;
}

interface DatePickerProps {
    event: DateTimePickerEvent;
    selectedDate?: Date;
}

export default function UsePicky() {
    // Estado inicial usando el tipo AppState
    const [state, setState] = useState<AppState>({
        date: new Date(),
        mode: 'date',
        show: false
    });

    // Tipamos la función onChange con la interface DatePickerProps
    const onChange = ({ event, selectedDate }: DatePickerProps) => {
        const currentDate = selectedDate || state.date;
        setState(prevState => ({
            ...prevState,
            show: false,
            date: currentDate
        }));
    };

    // Función para mostrar el modo de Date o Time Picker
    const showMode = (currentMode: 'date' | 'time') => {
        setState(prevState => ({
            ...prevState,
            show: true,
            mode: currentMode
        }));
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <View style={styles.separateButton}>
                <Button onPress={showDatepicker} title="Escoge la fecha!" />
            </View>
            {/* <View>
                <Button onPress={showTimepicker} title="Escoge la hora!" />
            </View> */}
            <Text style={styles.text}>Seleccionaste: {state.date.toLocaleString()}</Text>
            {state.show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={state.date}
                    mode={state.mode}
                    is24Hour={true}
                    onChange={(event, selectedDate) => onChange({ event, selectedDate })}
                    display='spinner'
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    separateButton: {
        marginBottom: 10,
    }
})