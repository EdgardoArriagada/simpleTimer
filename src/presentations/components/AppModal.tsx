import React, {ComponentProps, FC} from 'react';

import {Modal, StyleSheet, View} from 'react-native';

type Props = ComponentProps<typeof Modal>;

export const AppModal: FC<Props> = ({children, ...props}) => {
  return (
    <Modal animationType="fade" transparent {...props}>
      <View style={s.centeredView}>
        <View style={s.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
