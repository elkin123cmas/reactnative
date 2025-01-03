import React, { useState, useEffect } from "react";
import { Modal, Text, View, StyleSheet, TextInput, ScrollView, Pressable, Alert } from "react-native";
import UsePicky from "./Picky";
// Tipamos el prop modalVisible como booleano
interface FormularioProps {
    modalVisible: boolean;
    cerrarModal: () => void; // cambiar de boolean a función
    setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
    pacientes: Paciente[];
    pacienteSeleccionado: Paciente | null;
    setPacienteSeleccionado: React.Dispatch<React.SetStateAction<Paciente | null>>;
}
interface Paciente {
    id: number;
    paciente: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
    sintomas: string;
}

export default function Formulario({
    cerrarModal,
    modalVisible,
    setPacientes,
    pacientes,
    pacienteSeleccionado,
    setPacienteSeleccionado }: FormularioProps) {

    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');

    const [pacienteOriginal, setPacienteOriginal] = useState<Paciente | null>(null);

    useEffect(() => {
        // Verificar si pacienteSeleccionado no es null
        if (pacienteSeleccionado) {
            // Si existe un paciente seleccionado, cargar sus datos en los estados
            setId(pacienteSeleccionado.id.toString());
            setPaciente(pacienteSeleccionado.paciente);
            setPropietario(pacienteSeleccionado.propietario);
            setEmail(pacienteSeleccionado.email);
            setTelefono(pacienteSeleccionado.telefono);
            setFecha(pacienteSeleccionado.fecha);
            setSintomas(pacienteSeleccionado.sintomas);

            // Guardar los valores originales
            setPacienteOriginal({ ...pacienteSeleccionado });
            console.log('Datos cargados en el formulario');
        } else {
            // Si no hay paciente seleccionado, limpiar el formulario
            limpiarFormulario();
        }
    }, [pacienteSeleccionado]); // Añadir pacienteSeleccionado como dependencia

    const limpiarFormulario = () => {
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
    }; // Añadir pacienteSeleccionado como dependencia

    const handleCita = () => {
        //validar
        if ([paciente, propietario, email, telefono, sintomas].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                // [{ text: 'Cancelar' }, { text: 'OK' }]
            )
            return
        }
        const nuevoPaciente: Paciente = {
            id: pacienteSeleccionado?.id || Date.now(),
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        };
        //revisar si es un registro nuevo o edicion
        if (pacienteSeleccionado?.id) {
            // Editando un paciente existente
            const pacientesActualizados = pacientes.map(pacienteState =>
                pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
            );
            setPacientes(pacientesActualizados);
            setPacienteSeleccionado(null); // Limpiar el paciente seleccionado después de la edición
        } else {
            // Agregando un nuevo paciente
            setPacientes(prevPacientes => [...prevPacientes, nuevoPaciente]);
        }
        cerrarModal();
        limpiarFormulario(); // Limpiar formulario después de agregar/editar



    }



    return (
        <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.contenido}>
                <ScrollView>


                    <Text style={styles.titulo}>{pacienteSeleccionado ? 'Editar' : 'Nueva'} {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>
                    <Pressable style={styles.btnCancelar}
                        onPress={() => {
                            cerrarModal();
                            if (pacienteOriginal) {
                                setId(pacienteOriginal.id.toString());
                                setPaciente(pacienteOriginal.paciente);
                                setPropietario(pacienteOriginal.propietario);
                                setEmail(pacienteOriginal.email);
                                setTelefono(pacienteOriginal.telefono);
                                setFecha(pacienteOriginal.fecha);
                                setSintomas(pacienteOriginal.sintomas);
                            } else {
                                // Si no hay paciente original, limpiar el formulario
                                limpiarFormulario();
                            }
                        }}>
                        <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Paciente"
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Propietario"
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Paciente"
                            placeholderTextColor={'#666'}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Teléfono Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono Paciente"
                            placeholderTextColor={'#666'}
                            keyboardType="number-pad"
                            value={telefono}
                            onChangeText={setTelefono}
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta</Text>
                        <UsePicky />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas</Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            placeholder="Síntomas Paciente"
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <Pressable style={styles.btnNuevaCita}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnNuevaCitaTexto} >{pacienteSeleccionado ? 'Editar' : 'Guardar'} Paciente</Text>
                    </Pressable>
                </ScrollView>
            </View>

        </Modal>
    );
}
const styles = StyleSheet.create({
    contenido: {
        flex: 1,
        backgroundColor: '#56396a',
    },
    titulo: {
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
    },
    tituloBold: {
        fontWeight: '900',
    },
    btnCancelar: {
        marginVertical: 25,
        backgroundColor: '#8057a2',
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
    campo: {
        marginTop: 40,
        marginHorizontal: 30,
    },
    label: {
        color: 'white',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '600'
    },
    input: {
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 8,
    },
    sintomasInput: {
        height: 100,
        marginBottom: 20,
    },
    btnNuevaCita: {
        marginVertical: 30,
        backgroundColor: '#d36803',
        paddingVertical: 10,
        marginHorizontal: 30,
        borderRadius: 8,

    },
    btnNuevaCitaTexto: {
        fontSize: 17,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },



})