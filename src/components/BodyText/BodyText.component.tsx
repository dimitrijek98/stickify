import React, {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {bodyTextStyle} from 'components/BodyText/BodyText.style';

export type BodyTextProps = TextProps & {color?: keyof typeof bodyTextStyle};

const BodyText: FC<BodyTextProps> = ({
  children,
  style,
  color = 'dark',
  ...remainingProps
}) => {
  return (
    <Text
      style={StyleSheet.compose(bodyTextStyle[color], style)}
      {...remainingProps}>
      {children}
    </Text>
  );
};

export default BodyText;
