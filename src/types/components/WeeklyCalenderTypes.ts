export interface WeeklyCalenderTypes extends React.HTMLProps<HTMLElement> {
    value?: any,
    onChange?: any,
    setCurrentWeekData?:any,
    setCurrentDayData?:any,
    date?:any,
    time?:any,
    [key: string]: any;   // برای سایر props غیر مشخص
}
