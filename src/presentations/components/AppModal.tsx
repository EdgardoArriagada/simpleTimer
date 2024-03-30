import React, {ComponentProps, FC} from 'react';

import {Modal, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = ComponentProps<typeof Modal>;

export const AppModal: FC<Props> = ({children, ...props}) => {
  return (
    <Modal animationType="fade" transparent {...props}>
      {children}
    </Modal>
  );
};

type ModalComponent = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const ModalContent: FC<ModalComponent> = ({children, style}) => {
  return (
    <View style={s.modalContainer}>
      <View style={s.modalContent}>
        <View style={style}>{children}</View>
      </View>
    </View>
  );
};

export const ModalFooter: FC<ModalComponent> = ({children, style}) => {
  return <View style={[s.modalFooter, style]}>{children}</View>;
};

export const s = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
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
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
