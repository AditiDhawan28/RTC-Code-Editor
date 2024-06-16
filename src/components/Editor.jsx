import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { SocketActionType } from "../constant";
import { useEffect ,useState} from "react";
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
const Editor = ({ parentcode, socketConnection }) => {
  const [code, setCode] = useState(parentcode);
  const handleChanges = (inputCode) => {
    socketConnection?.emit(SocketActionType.CODE_CHANGE, {
      code: inputCode,
      roomCode,
    });
  };
  useEffect(() => {
    socketConnection?.on(SocketActionType.CODE_CHANGE, ({ code }) => {
      setCode(code);
    });
  }, [socketConnection, code]);
  return (
    <div className="overflow-hidden min-w-[100%] min-h-[100%] z-[100000] ">
      <CodeMirror
        className="text-black bg-primaryBlack min-h-full min-w-full"
        value={code}
        onChange={(code) => {
          handleChanges(code);
        }}
        height="98vh"
        extensions={[javascript()]}
        theme={dracula}
      />
    </div>
  );
};

export default Editor;
