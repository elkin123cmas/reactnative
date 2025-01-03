import { Modal, StyleSheet, } from 'react-native';
import { useState } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import Formulario from '@/components/Formulario';
import Paciente from '@/components/Pacientes';
import InformacionPaciente from '@/components/InformacionPaciente';

interface Paciente {
  id: number;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;

}

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
  const [modalPaciente, setModalPaciente] = useState(false);


  const pacienteEditar = (id: number) => {
    // Aquí puedes buscar el paciente por ID y abrir el modal de edición
    const paciente = pacientes.find(paciente => paciente.id === id);
    if (paciente) {
      setPacienteSeleccionado(paciente);
      setModalVisible(true); // Mostrar el formulario de edición
    }

  };
  const pacienteEliminar = (id: number) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        {
          text: 'Sí, Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter(pacientesState => pacientesState.id !== id)
            setPacientes(pacientesActualizados);
          }
        },
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false);
  }

  return (

    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>
      <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>
      {pacientes.length === 0 ? <Text style={styles.noPacientes}>No hay pacientes aún</Text> :
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPacienteSeleccionado={setPacienteSeleccionado} // Correcto aquí
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}

              />
            )
          }}
        />
      }
      {modalVisible && (
        <Formulario
          modalVisible={modalVisible}
          cerrarModal={cerrarModal}
          setPacientes={setPacientes}
          pacientes={pacientes}
          pacienteSeleccionado={pacienteSeleccionado}
          setPacienteSeleccionado={setPacienteSeleccionado}
        />
      )}

      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
          setPacientes={setPacientes}
          pacienteSeleccionado={pacienteSeleccionado}
          setModalPaciente={setModalPaciente}

        />
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: '800',
  },
  tituloBold: {
    fontSize: 25,
    fontWeight: '800',
    color: '#9364b9',
  },
  btnNuevaCita: {
    backgroundColor: "#7d50a0",
    padding: 8,
    marginTop: 20,
    width: "95%",
    borderRadius: 5,
  },
  btnTextoNuevaCita: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#f7f7f7',
    textAlign: "center",
  },
  noPacientes: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  }
});
