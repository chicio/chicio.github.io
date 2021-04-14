import * as React from "react";

export const PullToRefresh: React.FC = () => (
  <div id="pull-to-refresh" className="pull-to-refresh start-pull hidden-pull">
    <div id="pull-to-refresh-loader" className="pull-to-refresh-loader"></div>
    <div id="pull-to-refresh-status" className="pull-to-refresh-status">
      Pull down to refresh
    </div>
  </div>
);
