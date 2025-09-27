import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

interface DateInputProps {
    value: Date;
    onChange: (date: Date) => void;
    label: string;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChange, label }) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <View style={styles.input}>
            <Text style={styles.inputTitle}>{label}</Text>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowPicker(true)}
            >
                <Text>
                    {value ? value.toLocaleDateString() : 'Select date'}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) onChange(selectedDate);
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center"
    },
    inputTitle: {
        width: 80,
        fontWeight: "500",
        alignSelf: "flex-start",
    },
    dateButton: {
        borderColor: "grey",
        borderWidth: 1,
        flex: 1,
        padding: 10,
    },

});