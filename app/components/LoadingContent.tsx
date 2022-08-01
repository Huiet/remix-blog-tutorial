const ellipsisDotClassName = `
    absolute top-2 w-2 h-2 rounded-[50%] bg-primaryLight dark:bg-primaryDark
    ease-[cubic-bezier(0,1,1,0)]
    
    [&:nth-child(1)]:animate-e1
    
    [&:nth-child(2)]:left-1
    [&:nth-child(2)]:animate-e2
    
    [&:nth-child(3)]:left-8
    [&:nth-child(3)]:animate-e2
    
    [&:nth-child(4)]:left-14
    [&:nth-child(4)]:animate-e3
`;

export function LoadingContent() {
  return (
    <div className="w-full h-full grid place-items-center">
      <div>
        <div className="text-primaryLight dark:text-primaryDark text-lg">Loading</div>
        <div className="inline-block relative w-4 h-4">
          <div className={ellipsisDotClassName}></div>
          <div className={ellipsisDotClassName}></div>
          <div className={ellipsisDotClassName}></div>
          <div className={ellipsisDotClassName}></div>
        </div>
      </div>
    </div>
  );
}

// .lds-ellipsis {
//   display: inline-block;
//   position: relative;
//   width: 80px;
//   height: 80px;
// }
// .lds-ellipsis div {
//   position: absolute;
//   top: 33px;
//   width: 13px;
//   height: 13px;
//   border-radius: 50%;
//   background: #fff;
//   animation-timing-function: cubic-bezier(0, 1, 1, 0);
// }
// .lds-ellipsis div:nth-child(1) {
//   left: 8px;
//   animation: lds-ellipsis1 0.6s infinite;
// }
// .lds-ellipsis div:nth-child(2) {
//   left: 8px;
//   animation: lds-ellipsis2 0.6s infinite;
// }
// .lds-ellipsis div:nth-child(3) {
//   left: 32px;
//   animation: lds-ellipsis2 0.6s infinite;
// }
// .lds-ellipsis div:nth-child(4) {
//   left: 56px;
//   animation: lds-ellipsis3 0.6s infinite;
// }
// @keyframes lds-ellipsis1 {
//   0% {
//     transform: scale(0);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
// @keyframes lds-ellipsis3 {
//   0% {
//     transform: scale(1);
//   }
//   100% {
//     transform: scale(0);
//   }
// }
// @keyframes lds-ellipsis2 {
//   0% {
//     transform: translate(0, 0);
//   }
//   100% {
//     transform: translate(24px, 0);
// }
// }
