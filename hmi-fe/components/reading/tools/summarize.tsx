import React, { useState , useEffect} from 'react';
import './tools.css'
interface SidebarProps {
    onSummarize: () => void; //trạng thái cần tóm tắt hay không
    summary: string;        // kết quả trả về
    isSidebarOpen: boolean;  // Trạng thái sidebar có mở hay không
    setSidebarOpen: (open: boolean) => void;  // Hàm để thay đổi trạng thái mở của sidebar
  }

interface TypewriterEffectProps {
    text: string;  // Kiểu dữ liệu của text là string
    speed?: number; // Kiểu dữ liệu của speed là number, mặc định là 100
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState("");
  
    useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayText((prev) => prev + text[index]);
        index += 1;
        if (index === text.length) {
          clearInterval(intervalId); // Dừng hiệu ứng khi đã hiển thị hết
        }
      }, speed);
  
      return () => clearInterval(intervalId); // Clean up khi component bị unmount
    }, [text, speed]);
  
    return <div className="typewriter">{displayText}</div>;
  };

export const Sidebar: React.FC<SidebarProps> = ({ onSummarize, summary, isSidebarOpen, setSidebarOpen }) => {
    //const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Side bar */}
            <div  className={`bg-white text-black fixed top-36 right-0 h-full
    transition-transform duration-300 z-40
    ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full'
          }`}>
            {/* Sidebar content */}
            <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Summary</h2>
                    <div className="text-sm overflow-y-auto max-h-[80vh]">
                        {/* Hiển thị nội dung tóm tắt */}
                        {summary ? ( //summary
                            <TypewriterEffect text={summary} speed={5} />
                            //<div dangerouslySetInnerHTML={{ __html: summary }} />
                        ) : (
                          <div className="loader"></div> 
                        )}
                    </div>
                </div>
          </div>
          {/* Main content */}
          <div className={`flex-1 p-4 
                        ${isSidebarOpen ? 'mr-64' : 'ml-0'}`}>
            <div className='sidebar-btn' >
                <button 
                className= "fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full z-50"
            onClick={() => {
                setSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
                    if (!isSidebarOpen) onSummarize(); // Trigger summarization when opening the sidebar
              }}
            > 
             <span className="tooltip">
      Tóm tắt văn bản
    </span>
                {isSidebarOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
            </button>

            </div>
          </div>
        </div>
    )
}
export default Sidebar;