import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../../../actions/expenses/expenses-filters-action";

const styles = {
  customWidth: {
    width: 150
  }
};

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null
    };
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (event, index, value) => {
    if (value === "date") {
      console.log("Sorting by Data");
      this.props.sortByDate();
    } else if (value === "amount") {
      console.log("Sorting by Amount");
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div className="container">
        <div className="filter-items">
          <div className="row">
            <div className="col-sm-6">
              <SelectField
                floatingLabelText="Sort By"
                value={this.props.filters.sortBy}
                onChange={this.onSortChange}
                style={styles.customWidth}
              >
                <MenuItem value="date" primaryText="Date" />
                <MenuItem value="amount" primaryText="Amount" />
              </SelectField>
            </div>
            <div className="col-sm-6">
              <TextField
                autoFocus
                hintText="Search Expenses"
                floatingLabelText="Search By Text"
                type="text"
                value={this.props.filters.text}
                onChange={this.onTextChange}
              />
            </div>
          </div>
          <div className="filter-date-picker">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
