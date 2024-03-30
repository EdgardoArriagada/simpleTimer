import React, {ComponentProps, FC} from 'react';

import {Modal, View} from 'react-native';
import {gs} from '../../config/theme';

type Props = ComponentProps<typeof Modal>;

export const AppModal: FC<Props> = ({children, ...props}) => {
  return (
    <Modal animationType="fade" transparent {...props}>
      <View style={gs.centeredView}>
        <View style={gs.modalView}>{children}</View>
      </View>
    </Modal>
  );
};
