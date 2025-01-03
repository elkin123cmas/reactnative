import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface Paciente {
    id: number;
    paciente: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
    sintomas: string;
}

interface InformacionPacienteProps {
    pacienteSeleccionado: Paciente | null; // Puede ser null si no hay paciente seleccionado
    setModalPaciente: (visible: boolean) => void;
    setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;

}

const InformacionPaciente = ({ pacienteSeleccionado, setModalPaciente, setPacientes }: InformacionPacienteProps) => {
    if (!pacienteSeleccionado) {
        return (
            <View>
                <Text>No hay información disponible</Text>
            </View>
        );
    }
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
        <View
            style={styles.contenedor}
        >
            <Text style={styles.titulo}>Información <Text style={styles.tituloBold}> del Paciente</Text></Text>

            <View
                style={styles.contenido}
            >
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{pacienteSeleccionado.paciente}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario:</Text>
                    <Text style={styles.valor}>{pacienteSeleccionado.propietario}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{pacienteSeleccionado.email}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.valor}>{pacienteSeleccionado.telefono}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.valor}>{formateraFecha(pacienteSeleccionado.fecha)}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas:</Text>
                    <Text style={styles.valor}>{pacienteSeleccionado.sintomas}</Text>
                </View>

            </View>


            <Pressable
                style={styles.btnCerrar}
                onLongPress={() => {
                    setModalPaciente(false)
                    setPacientes([])
                }}
            >
                <Text style={styles.btnCancelarTexto}>Cerrar Ventana</Text>
            </Pressable>


        </View>
    );
};
const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#f59e0b',
        flex: 1,
        color: 'white',
    },
    titulo: {
        fontSize: 28,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        marginVertical: 30
    },
    tituloBold: {
        fontSize: 25,
        fontWeight: '800',
        color: '#9364b9',

    },
    btnCerrar: {
        marginVertical: 25,
        backgroundColor: '#E06900',
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    btnCancelarTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    contenido: {
        backgroundColor: '#f3eef9',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    campo: {
        marginTop: 8
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
    },
    valor: {
        fontWeight: '700',
        fontSize: 17,
        color: '#334155'
    }
})

export default InformacionPaciente;
