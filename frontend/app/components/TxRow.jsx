var React = require("react");
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedNumber = ReactIntl.FormattedNumber;
var Button = require('react-bootstrap/lib/Button');
var Popover = require('react-bootstrap/lib/Popover');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var bigRat = require("big-rational");

var TxRow = React.createClass({
  mixins: [IntlMixin],

  render: function() {
    var amount = bigRat(this.props.tx.amount).divide(Math.pow(10, this.props.market.decimals)).valueOf();
    return (
      <tr>
        <td>
          <div className="text-center">
            <FormattedNumber value={this.props.tx.block} />
          </div>
        </td>
        <td className={(this.props.tx.inout == 'in' ? "text-success" : "text-danger")}>
          <div className="text-center">
            { this.props.tx.inout }
          </div>
        </td>
        <td>
          <div className="text-center">
            { this.props.tx.type }
          </div>
        </td>
        <td>
          <div className="text-center">
            <samp>
              { this.props.tx.from }
            </samp>
              <br />
            <samp>
              { this.props.tx.to }
            </samp>
          </div>
        </td>
        <td>
          <div className="text-right">
            <FormattedMessage message={this.getIntlMessage('ether')}
                              value={amount}
                              unit={this.props.market.name} />
          </div>
        </td>
        <td>
          <div className="text-right">
            { this.props.tx.price ?
              <FormattedNumber value={this.props.tx.price} /> :
              'N/A' }
          </div>
        </td>
        <td>
          <div className="text-right">
            { this.props.tx.total.value ?
                <FormattedMessage message={this.getIntlMessage('ether')}
                                  value={this.props.tx.total.value}
                                  unit={this.props.tx.total.unit} /> :
                "N/A" }
          </div>
        </td>
        <td>
          <OverlayTrigger trigger={['click']} placement='left' rootClose={true} overlay={
              <Popover id={this.props.tx.hash + "-details"} bsSize="large">
                <div className="help-block">
                { this.formatMessage(this.getIntlMessage('txs.hash')) }
                  <div className="text-overflow">
                    <code>{ this.props.tx.hash }</code>
                  </div>
                </div>
                { this.props.tx.id &&
                  <div className="help-block">
                    { this.formatMessage(this.getIntlMessage('txs.id')) }
                      <div className="text-overflow">
                        <code>{ this.props.tx.id }</code>
                      </div>
                  </div> }
              </Popover>}>
            <div className="text-center">
              <Button bsSize="small">
                { this.props.tx.details }
              </Button>
            </div>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
});

module.exports = TxRow;
