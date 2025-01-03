import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

interface PacienteType {
    id: number;
    paciente: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
    sintomas: string;
}

interface PacienteProps {
    setModalVisible: (visible: boolean) => void;
    setModalPaciente: (visible: boolean) => void;
    setPacienteSeleccionado: React.Dispatch<React.SetStateAction<PacienteType | null>>;
    pacienteEditar: (id: number) => void;
    pacienteEliminar: (id: number) => void;
    item: PacienteType;
}

const Paciente = ({
    item,
    setModalVisible,
    setPacienteSeleccionado,
    pacienteEditar,
    pacienteEliminar,
    setModalPaciente }: PacienteProps) => {

    const { paciente, fecha } = item;
    const formateraFecha = (fecha: Date) => {
        const opciones: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return fecha.toLocaleDateString('es-ES', opciones)
    }
    return (
        <Pressable onPress={() => {
            setModalPaciente(true);
            setPacienteSeleccionado(item); // setPacienteSeleccionado en lugar de setPacientes
        }}>
            <View style={styles.contenedor}>
                <Text style={styles.text}>Paciente:</Text>
                <Text style={styles.label}>{item.paciente}</Text>
                {/* <Text style={styles.label}>Propietario: {item.propietario}</Text>
            <Text style={styles.label}>Email: {item.email}</Text>
            <Text style={styles.label}>Teléfono: {item.telefono}</Text> */}
                <Text style={styles.fecha}>{formateraFecha(fecha)}</Text>
                {/* <Text style={styles.label}>Síntomas: {item.sintomas}</Text> */}

                <View style={styles.contenedorBotones}>
                    <Pressable
                        onPress={() => {
                            setModalVisible(true)
                            pacienteEditar(item.id)
                        }}
                        style={[styles.btn, styles.btnEditar]}>
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, styles.btnEliminar]}
                        onPress={() => pacienteEliminar(item.id)}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        padding: 10,
        paddingHorizontal: 60,
        marginBottom: 10,
        backgroundColor: '#f3eef9',
        borderRadius: 5,
        marginHorizontal: 0,
    },
    label: {
        fontSize: 25,
        marginBottom: 3,
        color: '#7d50a0',
        fontWeight: '600',
    },
    text: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 3,
        textTransform: 'uppercase',

    },
    fecha: {
        fontSize: 17,
        marginBottom: 3,
        color: '#374151',
        fontWeight: '600',
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btn: {
        paddingVertical: 9,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    btnEditar: {
        backgroundColor: '#d36803',
    },
    btnEliminar: {
        backgroundColor: '#EF4444',

    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 11,
        color: 'white',
    },
});

export default Paciente;
