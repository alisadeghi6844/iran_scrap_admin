import TextOverflow from "../../../../utils/TextOverflow";

const RenderReplayTo=({replayTo}:{replayTo:any})=>{
    if (!replayTo) return null;

    return (
      <div className="w-[90%] p-1 right-1/2 top-2 absolute translate-x-1/2 rounded flex-col justify-end h-auto border-l-4 border-primary-500 bg-primary-100 flex">
        <div className="text-xs flex w-full justify-end">
          <TextOverflow number={20}>علی صادقی</TextOverflow>
        </div>
        <div className="text-[14px] text-primary-600 break-words">
          <TextOverflow number={20}>
            سلام حالت چطوره سلام حالت چطوره سلام حالت چطوره سلام حالت چطوره سلا
          </TextOverflow>
        </div>
      </div>
    );
}

export default RenderReplayTo;