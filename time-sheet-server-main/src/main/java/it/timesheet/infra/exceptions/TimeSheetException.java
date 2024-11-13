package it.timesheet.infra.exceptions;

public class TimeSheetException extends RuntimeException {
    public TimeSheetException(String msg){
        super(msg);
    }
}
