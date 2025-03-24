import React from "react";
class Skillvl extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className="skill-bar">
                <div className="skill-name">{this.props.skillName}</div>
                <div className="progress" role="progressbar" aria-label={this.props.skillName} aria-valuenow={this.props.level} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: `${this.props.level}%` }}></div>
                </div>
            </div>
        )
    }
}
export default Skillvl