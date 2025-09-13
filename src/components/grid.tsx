import type React from "react"
import { cn } from "@/lib/utils"

interface GridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
  noBorder?: "top" | "right" | "bottom" | "left" | "all" | "none" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-bottom" | "left-right" | "top-left-right" | "top-right-bottom" | "bottom-left-right" | "bottom-top-left" | "top-left-bottom" | "top-right-left" | "bottom-right-top" | "bottom-left-top" | ("top" | "right" | "bottom" | "left")[]
  connectTo?: "top" | "bottom" | "none"
  hideDecorators?: boolean
  crossPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-left-bottom-right" | "top-right-bottom-left" | "all-corners" | "top-center" | "bottom-center" | "left-center" | "right-center" | "top-left-top-right" | "bottom-left-bottom-right" | "top-left-bottom-left" | "top-right-bottom-right" | "top-left-top-right-bottom-left" | "top-left-top-right-bottom-right" | "top-left-bottom-left-bottom-right" | "top-right-bottom-left-bottom-right" | "top-edges" | "bottom-edges" | "left-edges" | "right-edges" | "center-cross" | "none" | ("top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center" | "left-center" | "right-center" | "center-cross")[]
}

export function Grid({
  children,
  className,
  columns = 1,
  noBorder = "none",
  connectTo = "none",
  hideDecorators = false,
  crossPosition = "top-left-bottom-right",
}: GridProps) {
  const getBorderClasses = () => {
    if (noBorder === "all") return "border-0";
    if (noBorder === "none") return "";
    
    if (Array.isArray(noBorder)) {
      const classes = [];
      if (noBorder.includes("top")) classes.push("border-t-0");
      if (noBorder.includes("right")) classes.push("border-r-0");
      if (noBorder.includes("bottom")) classes.push("border-b-0");
      if (noBorder.includes("left")) classes.push("border-l-0");
      return classes.join(" ");
    }
    
    const borderMap: Record<string, string> = {
      "top": "border-t-0",
      "right": "border-r-0",
      "bottom": "border-b-0",
      "left": "border-l-0",
      "top-right": "border-t-0 border-r-0",
      "top-left": "border-t-0 border-l-0",
      "bottom-right": "border-b-0 border-r-0",
      "bottom-left": "border-b-0 border-l-0",
      "top-bottom": "border-t-0 border-b-0",
      "left-right": "border-l-0 border-r-0",
      "top-left-right": "border-t-0 border-l-0 border-r-0",
      "top-right-bottom": "border-t-0 border-r-0 border-b-0",
      "bottom-left-right": "border-b-0 border-l-0 border-r-0",
      "bottom-top-left": "border-b-0 border-t-0 border-l-0",
      "top-left-bottom": "border-t-0 border-l-0 border-b-0",
      "top-right-left": "border-t-0 border-r-0 border-l-0",
      "bottom-right-top": "border-b-0 border-r-0 border-t-0",
      "bottom-left-top": "border-b-0 border-l-0 border-t-0",
    };
    
    return borderMap[noBorder] || "";
  };

  return (
    <div
      className={cn(
        "relative border border-gray-200",
        getBorderClasses(),
        connectTo === "top" && "-mt-px",
        connectTo === "bottom" && "-mb-px",
        className,
      )}
    >
      {!hideDecorators && crossPosition !== "none" && (
        <>
          {(() => {
            const shouldShowTopLeft = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("top-left");
              }
              return crossPosition === "top-left" || 
                crossPosition === "top-left-bottom-right" || 
                crossPosition === "top-right-bottom-left" || 
                crossPosition === "all-corners" ||
                crossPosition === "top-left-top-right" ||
                crossPosition === "top-left-bottom-left" ||
                crossPosition === "top-left-top-right-bottom-left" ||
                crossPosition === "top-left-top-right-bottom-right" ||
                crossPosition === "top-left-bottom-left-bottom-right" ||
                crossPosition === "top-edges";
            };

            const shouldShowTopRight = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("top-right");
              }
              return crossPosition === "top-right" || 
                crossPosition === "top-right-bottom-left" || 
                crossPosition === "all-corners" ||
                crossPosition === "top-left-top-right" ||
                crossPosition === "top-right-bottom-right" ||
                crossPosition === "top-left-top-right-bottom-left" ||
                crossPosition === "top-left-top-right-bottom-right" ||
                crossPosition === "top-right-bottom-left-bottom-right" ||
                crossPosition === "top-edges";
            };

            const shouldShowBottomLeft = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("bottom-left");
              }
              return crossPosition === "bottom-left" || 
                crossPosition === "top-right-bottom-left" || 
                crossPosition === "all-corners" ||
                crossPosition === "bottom-left-bottom-right" ||
                crossPosition === "top-left-bottom-left" ||
                crossPosition === "top-left-top-right-bottom-left" ||
                crossPosition === "top-left-bottom-left-bottom-right" ||
                crossPosition === "top-right-bottom-left-bottom-right" ||
                crossPosition === "bottom-edges";
            };

            const shouldShowBottomRight = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("bottom-right");
              }
              return crossPosition === "bottom-right" || 
                crossPosition === "top-left-bottom-right" || 
                crossPosition === "all-corners" ||
                crossPosition === "bottom-left-bottom-right" ||
                crossPosition === "top-right-bottom-right" ||
                crossPosition === "top-left-top-right-bottom-right" ||
                crossPosition === "top-left-bottom-left-bottom-right" ||
                crossPosition === "top-right-bottom-left-bottom-right" ||
                crossPosition === "bottom-edges";
            };

            const shouldShowTopCenter = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("top-center");
              }
              return crossPosition === "top-center";
            };

            const shouldShowBottomCenter = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("bottom-center");
              }
              return crossPosition === "bottom-center";
            };

            const shouldShowLeftCenter = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("left-center");
              }
              return crossPosition === "left-center";
            };

            const shouldShowRightCenter = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("right-center");
              }
              return crossPosition === "right-center";
            };

            const shouldShowCenterCross = () => {
              if (Array.isArray(crossPosition)) {
                return crossPosition.includes("center-cross");
              }
              return crossPosition === "center-cross";
            };

            return (
              <>
                {shouldShowTopLeft() && (
                  <div className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowTopRight() && (
                  <div className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowBottomLeft() && (
                  <div className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowBottomRight() && (
                  <div className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowTopCenter() && (
                  <div className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowBottomCenter() && (
                  <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowLeftCenter() && (
                  <div className="absolute top-1/2 left-0 translate-x-[-50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowRightCenter() && (
                  <div className="absolute top-1/2 right-0 translate-x-[50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {shouldShowCenterCross() && (
                  <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-5 h-5 z-10 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2V10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 6H10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </>
            );
          })()}
        </>
      )}
      <div
        className={cn(
          "grid gap-px bg-gray-200",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function GridItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white p-8", className)}>{children}</div>
}