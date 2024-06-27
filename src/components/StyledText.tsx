import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  // TODO: Currently custom font is not working. Need to fix this.
  // return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
  return <Text {...props} style={[props.style]} />;
}
