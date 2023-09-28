import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {headingTextStyle} from 'components/HeadingText/HeadingText.style';
import BodyText, {BodyTextProps} from 'components/BodyText/BodyText.component';

type HeadingTextProps = BodyTextProps & {size?: keyof typeof headingTextStyle};

const HeadingText: FC<HeadingTextProps> = ({
  children,
  style,
  size = 'h1',
  ...remainingProps
}) => {
  return (
    <BodyText
      style={StyleSheet.compose(headingTextStyle[size], style)}
      {...remainingProps}>
      {children}
    </BodyText>
  );
};

export default HeadingText;
