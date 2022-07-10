import React from 'react';

import { Feather } from '@expo/vector-icons';
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars';

import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

LocaleConfig.defaultLocale = 'pt-br';
LocaleConfig.locales['pt-br'] = ptBR;

export interface MarkedDateProps {
  [key: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (day: DateData) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  markedDates,
  onDayPress,
}) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={direction => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={`chevron-${direction}`}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_500,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date().toString()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};
