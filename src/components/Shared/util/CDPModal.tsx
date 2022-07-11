import { Modal } from "semantic-ui-react";
import styled from "@emotion/styled";

const CDPModal = styled(Modal)({
  "i.close.icon": {
    // move close icon inside modal
    top: 0,
    right: 0,
    color: "black",
  },
  "i.close::before": {
    // change icon to ✖
    content: '"\u2716"',
  },
});

export default CDPModal;
