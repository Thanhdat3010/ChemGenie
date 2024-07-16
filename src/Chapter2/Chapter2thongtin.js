import React from 'react';
import './Chapter2thongtin.css';
import { Collapse} from 'antd';
import Hinhchapter21 from "../Hinhchapter/Chapter2.1.png";
import Hinhchapter22 from "../Hinhchapter/Chapter2.2.png";
import Hinhchapter23 from "../Hinhchapter/Chapter2.3.png";
import Hinhchapter24 from "../Hinhchapter/Chapter2.4.png";
import Hinhchapter25 from "../Hinhchapter/Chapter2.5.png";
import Hinhchapter26 from "../Hinhchapter/Chapter2.6.png";
import Hinhchapter27 from "../Hinhchapter/Chapter2.7.png";
import Hinhchapter28 from "../Hinhchapter/Chapter2.8.png";

import Congthuc1Chapter2  from "../Hinhchapter/Congthuc1Chapter2.png"
import Congthuc2Chapter2  from "../Hinhchapter/Congthuc2Chapter2.png"
import Congthuc3Chapter2  from "../Hinhchapter/Congthuc3Chapter2.png"
import Congthuc4Chapter2  from "../Hinhchapter/Congthuc4Chapter2.png"
import Congthuc5Chapter2  from "../Hinhchapter/Congthuc5Chapter2.png"
import Congthuc6Chapter2  from "../Hinhchapter/Congthuc6Chapter2.png"
import Congthuc7Chapter2  from "../Hinhchapter/Congthuc7Chapter2.png"
import Congthuc8Chapter2  from "../Hinhchapter/Congthuc8Chapter2.png"
import Congthuc9Chapter2  from "../Hinhchapter/Congthuc9Chapter2.png"
import Congthuc10Chapter2  from "../Hinhchapter/Congthuc10Chapter2.png"
import Congthuc11Chapter2  from "../Hinhchapter/Congthuc11Chapter2.png"
import Congthuc12Chapter2  from "../Hinhchapter/Congthuc12Chapter2.png"
import Congthuc13Chapter2  from "../Hinhchapter/Congthuc13Chapter2.png"

const { Panel } = Collapse;
function Chapter2thongtin() {
    return (
      <div id="faq" className="block faqBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>CÁC PHA CỦA VẬT CHẤT</h2>
          </div>
          <Collapse defaultActiveKey={['1']} size="large">
            <Panel header="I. Khí" key="1" className='Panel'>
            <p>Các đặc tính cơ bản của khí bao gồm:</p>
            <p>•&nbsp;Khí không có thể tích xác định và có thể bị nén.</p>
            <p>•&nbsp;Khí không có hình dạng xác định và lấy hình dạng của bình chứa chúng.</p>
            <p>•&nbsp;Các phân tử khí được phân tán rộng rãi.</p>
            <p>Ngoài các đặc tính cơ bản này, có nhiều lý thuyết và định luật khác mô tả cách khí thể hiện hành vi. Đây là trọng tâm chính của chương này.</p>

            </Panel>
            <Panel header="II. Lý thuyết về phân tử động học" key="2" className='Panel'>
            <p>Hành vi của khí còn có thể được giải thích thêm bằng Lý thuyết phân tử động học, hay KMT. KMT mô tả những điều sau:</p>
            <p>•&nbsp;Các phân tử khí là các hạt riêng lẻ di chuyển theo đường thẳng và ngẫu nhiên. Điều này sẽ tiếp tục cho đến khi chúng va chạm hoặc bị tác động bởi một lực khác.</p>
            <p>•&nbsp;Các phân tử khí liên tục va chạm và truyền năng lượng trong suốt những va chạm này. Trong một mẫu khí cô lập, năng lượng tổng là bảo toàn.</p>
            <p>•&nbsp;Thể tích của từng phân tử khí là không đáng kể so với thể tích mà chúng chiếm.</p>
            <p>•&nbsp;Không xem xét sự tồn tại của lực hấp dẫn giữa các phân tử khí.</p>
            <p>Những nguyên lý này giúp chúng ta hiểu và dự đoán hành vi quang học của khí bằng cách xem xét những chuyển động và tương tác vi mô của các hạt riêng lẻ.</p>
            </Panel>
            <Panel header="III. Áp lực" key="3" className='Panel'>
            <p>Các khí tạo ra áp lực khi va chạm vào các vật khác. Áp lực được tạo ra bởi khí có thể được định nghĩa là lượng lực tác động lên một diện tích. Bất kỳ người nào đã xem hoặc nghe một bản tin thời tiết có thể nhớ đến việc nghe về áp suất khí quyển hoặc áp suất không khí. Những áp suất này có thể khác nhau khi hệ thống áp suất cao và áp suất thấp di chuyển qua một khu vực cụ thể. Có hai thiết bị được sử dụng để đo áp suất tạo ra bởi khí, đó là cột thủy ngân và bồn đo áp suất. Cả hai thiết bị đều có thể hữu ích tùy thuộc vào tình huống.
            </p>
            <img alt="Hình 2.1" src={Hinhchapter21} className="Hinhchapter"></img>
            <p>
            Cột thủy ngân (xem Hình 2.1) sử dụng một cột thủy ngân trong suốt được đổ thủy ngân vào một bình chứa chất thủy ngân. Khi bạn di chuyển lên độ cao, mức thủy ngân trong cột thủy ngân giảm vì có ít không khí ở độ cao cao hơn. Trung bình, chiều cao của thủy ngân trong cột là 760 milimét so với mức thủy ngân trong bình chứa. Áp suất trung bình này được gọi là áp suất tiêu chuẩn hoặc áp suất khí quyển bình thường.
            Có nhiều đơn vị có thể được sử dụng để đo áp suất không khí. Ví dụ, milimét có thể được chuyển đổi thành inch; do đó, áp suất tiêu chuẩn 760 mm Hg cũng có thể được ghi nhận là 30.0 inch thủy ngân. Inch thủy ngân là đơn vị được sử dụng cho các bản tin thời tiết ở Hoa Kỳ. Ba đơn vị phổ biến khác tương ứng với 760 mm Hg là:</p>
            <p>•&nbsp;Khí không có thể tích xác định và có thể bị nén.</p>
            <p>•&nbsp;Khí không có hình dạng xác định và lấy hình dạng của bình chứa chúng.</p>
            <p>•&nbsp;Các phân tử khí được phân tán rộng rãi.</p>
            <p>Một đơn vị cuối cùng được gặp khi đo áp suất là pound trên mỗi inch vuông (psi). Đơn vị này thường được dành cho việc đo áp suất không khí trong lốp xe tại các trạm xăng ở Hoa Kỳ. Bồn đo áp suất được sử dụng để xác định áp suất của một khí bị chận trong một bình chứa. Hình dáng và mở đầu ở phía trên của bồn đo áp suất cho phép một lượng thủy ngân nhất định được chuyển động tùy thuộc vào áp suất khí quyển và áp suất của khí trong bình chứa. Có ba tình huống cần xem xét khi sử dụng bồn đo áp suất: áp suất khí bằng với áp suất khí quyển, áp suất khí lớn hơn áp suất khí quyển, và áp suất khí nhỏ hơn áp suất khí quyển. Các tình huống này có thể thấy trong Hình 2.2.</p>
            <img alt="Hình 2.2" src={Hinhchapter22} className="Hinhchapter"></img>
            </Panel>
            <Panel header="IV. Định luật Boyle" key="4" className='Panel'>
            <p>Robert Boyle đã thực hiện các thí nghiệm để xem làm thế nào việc thay đổi áp suất lên một khí sẽ ảnh hưởng đến thể tích của nó. Thí nghiệm của ông cho thấy rằng khi áp suất lên khí tăng, thể tích mà khí chiếm giảm đi. Trong Hình 2.3, biểu đồ bên trái thể hiện một piston không tạo ra áp lực lớn lên một mẫu khí. Biểu đồ ở giữa cho thấy piston đã được nhấn xuống, làm tăng áp suất lên khí. Đáp ứng với sự tăng áp suất, thể tích của khí đã giảm.</p>
            <img alt="Hình 2.3" src={Hinhchapter23} className="Hinhchapter"></img>
            <p>Boyle đã xác định được rằng, ở nhiệt độ không đổi, có một mối quan hệ nghịch đảo giữa áp suất và thể tích. Nghĩa là, khi giá trị của một yếu tố tăng, giá trị của yếu tố kia giảm. Đồ thị trong Hình 2.3 cho thấy mối quan hệ toán học giữa áp suất và thể tích. Phương trình P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> có thể được sử dụng để thực hiện các tính toán bằng Định luật Boyle để xác định thể tích cuối cùng của một khí sau khi nó đã trải qua sự thay đổi áp suất.</p>
            <p><b>Bài toán:</b></p>
            <p>Một khí chiếm thể tích 22.4 lít và áp suất lên nó tăng từ 760 torr lên 1520 torr. Thể tích mới là bao nhiêu? Tại sao câu trả lời của bạn hợp lý?</p>
            <p><b>Giải pháp:</b> Thể tích ban đầu của khí là 22.4 lít (V<sub>1</sub>) ở áp suất ban đầu là 760 torr (P<sub>1</sub>). Áp suất mới là 1520 torr (P<sub>2</sub>).
            <br/>
            Sử dụng phương trình P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>, chúng ta sắp xếp lại để giải cho thể tích mới sao cho phương trình trông như P<sub>1</sub>V<sub>1</sub>/P<sub>2</sub> = V<sub>2</sub>.
            <img src={Congthuc1Chapter2} className="math-image" alt="Math Formula"/>
            <br/>
            Giá trị của thể tích mới là 11.20 lít.
            <br/>
            Câu trả lời có ý nghĩa không? Có. Áp suất đã tăng/gấp đôi; do đó, thể tích phải giảm/giảm một nửa. Câu trả lời rõ ràng cho thấy một thể tích nhỏ hơn so với thể tích ban đầu là 22.4 lít.
            </p>      
            <p><b>Hãy suy nghĩ về điều này:</b></p>
            <p>Thể tích giảm khi áp suất tăng lên không? Một chai nước ngọt nhựa có thể chứa 20 ounces. Nếu một chai đã được rót sạch và sau đó bị làm phẳng bằng cách có người nhảy lên, chai nước sẽ giữ được bao nhiêu ounces nước bây giờ?</p>
            </Panel>
            <Panel header="V. Định luật Charles" key="5" className='Panel'>
            <p>Jacques Charles đã thực hiện các thí nghiệm lượng số về ảnh hưởng của sự thay đổi nhiệt độ đối với thể tích của khí. Qua nhiều thí nghiệm khác nhau, ông đã có thể định lượng mối quan hệ giữa nhiệt độ và thể tích. Mối quan hệ này, khác với mối quan hệ được biểu diễn bởi Định luật Boyle, được phát hiện là mối quan hệ trực tiếp. Nghĩa là, khi nhiệt độ của một khí tăng, thể tích của khí cũng tăng theo. Đồ thị trong Hình 2.4 thể hiện một mối quan hệ trực tiếp:</p>
            <img alt="Hình 2.4" src={Hinhchapter24} className="Hinhchapter"></img>
            <p><b>Hãy nghĩ về điều này:</b></p>
            <p>Nếu một bóng bay được đặt trong tủ lạnh trong 10 phút, điều gì sẽ xảy ra với nó?Quan trọng khi xem xét về chủ đề nhiệt độ trước khi cố gắng tính toán sử dụng Định luật Charles:
            <img src={Congthuc2Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p><b>Bài toán:</b></p>
            <p>Một mẫu khí ở điều kiện tiêu chuẩn chiếm thể tích 11.2 lít. Nhiệt độ của khí được thay đổi lên 273°C. Thể tích mới của khí là bao nhiêu? Câu trả lời của bạn có ý nghĩa không?</p>
            <p><b>Giải pháp:</b> Đầu tiên, chúng ta cần chuyển đổi nhiệt độ sang Kelvin. Nhiệt độ ban đầu của mẫu (T<sub>1</sub>) là 273 K. Nhiệt độ mới là (T<sub>2</sub>) K = 273 + 273 = 546 K. Thể tích ban đầu (V<sub>1</sub>) là 11.2 lít. Sử dụng Định luật Charles và thay thế, chúng ta có:
            <img src={Congthuc2Chapter2} className="math-image" alt="Math Formula"/>
            <img src={Congthuc3Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Giải phương trình ta được một câu trả lời là 22.4 lít. Chúng ta đã làm đúng chứ? Đúng với, sự tăng lên/gấp đôi nhiệt độ đã dẫn đến sự tăng lên/gấp đôi thể tích của khí.</p>
            </Panel>
            <Panel header="VI. Nhiệt độ" key="6" className='Panel'>
            <p>Nhiệt độ được định nghĩa là năng lượng động trung bình của một mẫu. Thực tế, nhiệt độ đo lường chuyển động, vì vậy có định nghĩa "năng lượng động trung bình." Có hai thang đo nhiệt độ quan trọng cần biết trong hóa học là Celsius và Kelvin. Thang Celsius dựa trên điểm đóng và điểm sôi của nước, lần lượt là 0°C và 100°C. Trong khi đó, thang Kelvin dựa trên nhiệt độ thấp nhất có thể đạt được, 0K, hay zero tuyệt đối. Tin rằng, ở zero tuyệt đối, tất cả chuyển động của phân tử đều dừng lại. Mối quan hệ giữa Celsius và Kelvin được biểu diễn như K = C + 273.</p>
            <p>Khi giải quyết các vấn đề, thang Kelvin được ưa chuộng vì, khác với thang Celsius, thang Kelvin không tạo ra số âm hoặc số không để nhân hoặc chia.</p>
            <p><b>Bài toán:</b></p>
            <p>Điểm sôi và điểm đóng của nước trên thang đo Kelvin là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Điểm sôi của nước là 100°C. Sử dụng K = C + 273, ta có 100 + 273 = 373 K. Áp dụng phương trình tương tự, điểm đóng của nước sẽ là 273 K.</p>
            </Panel>
            <Panel header="VII. Nhiệt độ và áp suất tiêu chuẩn" key="7" className='Panel'>
            <p>Bởi vì các thí nghiệm có thể liên quan đến nhiều điều kiện khác nhau có thể ảnh hưởng đến kết quả của thí nghiệm, cần phải đặt ra một tiêu chuẩn để tạo ra một bộ điều kiện chung. Nhiệt độ và áp suất tiêu chuẩn, hay STP, được định nghĩa là 0°C và 1 atm (273 K và 760 torr).</p>
            </Panel>
            <Panel header="VIII. Động năng trung bình của khí" key="8" className='Panel'>
            <p>Mặc dù sự tăng nhiệt độ dẫn đến sự gia tăng năng lượng động trung bình, không phải tất cả các phân tử khí sẽ có cùng một lượng năng lượng động. Đây là lý do tại sao thuật ngữ "năng lượng động trung bình" được sử dụng. Hai đường cong trong Hình 2.5 thể hiện phân phối tốc độ phân tử của một khí ở hai nhiệt độ khác nhau. Lưu ý rằng ở nhiệt độ cao hơn, các phân tử khí di chuyển với năng lượng động cao hơn.</p>
            </Panel>
            <Panel header="IX. Định luật khí hỗn hợp" key="9" className='Panel'>
            <p>Định luật Charles và định luật Boyle được sử dụng khi áp suất và nhiệt độ của một hệ thống được giữ nguyên, tương ứng. Nhưng nếu áp suất, nhiệt độ và thể tích đều thay đổi trong một vấn đề, điều gì sẽ xảy ra? Đó là khi Định luật Khí hỗn hợp được sử dụng.
            <img alt="Hình 2.5" src={Hinhchapter25} className="Hinhchapter"></img>
            <img src={Congthuc4Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Định luật Khí hỗn hợp kết hợp những nguyên tắc của Charles và Boyle. Chú ý rằng nếu bạn che đi các biến T, phương trình của Boyle vẫn được giữ nguyên. Tương tự, nếu bạn che đi các biến P, phương trình của Charles vẫn được giữ nguyên. Thay vì nhớ cả hai phương trình cho Định luật Charles và Boyle, việc nhớ Định luật Khí hỗn hợp và "che đi" các biến đang được giữ nguyên là dễ dàng hơn nhiều.</p>
            <p><b>Bài toán:</b></p>
            <p>Một mẫu khí neon dung tích 5.6 lít ở điều kiện tiêu chuẩn (STP). Nếu nhiệt độ tăng lên 298K và áp suất thay đổi thành 600 torr, thể tích mới của mẫu khí sẽ là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Vấn đề bắt đầu ở điều kiện STP, có nghĩa là P<sub>1</sub> = 760 torr và T<sub>1</sub> = 273K. Thể tích ban đầu là 5.6 lít, nên V<sub>1</sub> = 5.6L. Áp suất cuối cùng P<sub>2</sub> là 600 torr và nhiệt độ cuối cùng là 298K.</p>
            <p>Tiếp theo, sử dụng Định luật Khí hỗn hợp:
            <img src={Congthuc5Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Thay thế biến ta được:
            <img src={Congthuc6Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Kéo nhân và chia để giải cho thể tích mới:
            <img src={Congthuc7Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Hãy tự hỏi, câu trả lời có hợp lý không?</p>
            <p>Nhiệt độ đã tăng và áp suất đã giảm, vì vậy thể tích mới nên lớn hơn so với 5.6 lít ban đầu.</p>
            </Panel>
            <Panel header="X. Định luật áp suất riêng của Dalton" key="10" className='Panel'>
            <p>Dalton phát hiện rằng khi các khí được trộn trong cùng một container và chúng có cùng nhiệt độ, áp suất tổng do các khí tạo ra bằng tổng của áp suất từng khí riêng lẻ. Điều này có thể thấy trong phương trình: P<sub>total</sub> = P<sub>gas1</sub> + P<sub>gas2</sub> + P<sub>gas3</sub> ……………. Hãy xem xét một container chứa hỗn hợp khí nitrogen và khí oxygen. Nếu áp suất của khí oxygen là 400 torr và áp suất của khí nitrogen là 360 torr, thì áp suất tổng là gì? Sử dụng Định luật Áp suất Riêng của Dalton, áp suất tổng là tổng của các áp suất riêng lẻ này, tức là 760 torr.</p>
            <p><b>Bài toán:</b></p>
            <p>Tham khảo ví dụ trên. Viết một phương trình cho áp suất riêng của nitrogen và oxygen. Nếu áp suất tổng trong container là 900 torr và áp suất riêng của khí oxygen là 560 torr, thì áp suất riêng của khí nitrogen là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Phương trình là Ptotal = P<sub>O<sub>2</sub></sub> + P<sub>N<sub>2</sub></sub>. Áp suất tổng là 900 torr trừ đi áp suất riêng của khí oxygen, 560 torr, cho ta áp suất riêng của khí nitrogen, là 340 torr.</p>
            </Panel>
            <Panel header="XI. Định luật Avogadro" key="11" className='Panel'>
            <p>Công trình của Avogadro sẽ được xem xét kỹ lưỡng hơn trong Chương 6, nhưng tạm thời hãy nhớ quy tắc này: Thể tích bằng nhau của các khí đóng góp một cách đồng đều vào áp suất tổng. Ví dụ, nếu một container được điền 50% khí neon và 50% khí argon, với áp suất tổng là 760 torr, mỗi khí sẽ đóng góp 380 torr cho áp suất tổng. Nếu thể tích của các khí không bằng nhau, phần trăm thể tích mà mỗi khí chiếm sẽ đóng góp một phần trăm tương ứng vào áp suất tổng.</p>
            <p><b>Giải bài toán:</b></p>
            <p>Một container chứa ba loại khí được pha trộn với nhau ở điều kiện tiêu chuẩn (STP). Container này có (theo thể tích) 10% He, 40% neon và 50% argon. Áp suất riêng của ba loại khí là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Vì hỗn hợp khí này ở điều kiện STP, áp suất tổng sẽ là áp suất tiêu chuẩn, 760 torr. Cho các phần trăm khí đã được cung cấp, chúng ta có thể thiết lập như sau:</p>
            <p>•&nbsp;10% của 760 là 76, nên He đóng góp 76 torr (10% * 760).</p>
            <p>•&nbsp;50% (hoặc một nửa) của 760 là 380, nên Ar đóng góp 380 torr (50% * 760).</p>
            <p>•&nbsp;304 torr còn lại đến từ Ne, đóng góp 304 torr (40% * 760).</p>
            <p>Kiểm tra công việc của bạn. Tổng áp suất riêng có bằng áp suất tổng là 760 torr không?</p>
            </Panel>
            <Panel header="XII. Định luật Diffusion/Effusion của Graham và Mật độ của Khí" key="12" className='Panel'>
            <p>Chắc chắn, bạn đã từng bước vào một căn phòng và cảm nhận được mùi hương từ một lọ nước hoa mở, phải không? Ngay cả khi lọ nước hoa ở một bên của căn phòng, bạn vẫn có thể ngửi thấy mùi ở bên kia. Đó là do khí di chuyển nhanh chóng và có thể lan tỏa hoặc khuếch tán. Theo Định luật Diffusion/Effusion của Graham, ở cùng nhiệt độ và áp suất, khí khuếch tán với tốc độ nghịch đảo tỉ lệ với căn bậc hai của khối lượng phân tử của chúng. Điều này có thể thấy trong phương trình:
            <img src={Congthuc8Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Mặc dù điều này có vẻ khó hiểu một chút, nhưng có thể diễn đạt một cách đơn giản là "khí nhẹ, ít mật độ sẽ di chuyển với tốc độ lớn hơn."Bởi vì khí nhẹ, bạn cần một mẫu khí lớn hơn để đo lường khối lượng của một mẫu cụ thể. Cho tiện lợi, bạn có thể giả định một mẫu 22.4 lít (về lý do sẽ thảo luận sau) và sử dụng phương trình:
            <img src={Congthuc9Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p><b>Bài toán:</b> Tính tốc độ truyền khí nitrogen thành khí oxygen. Làm thế nào điều này so sánh với mật độ của khí?</p>
            <p><b>Kết quả:</b> 
            <img src={Congthuc8Chapter2} className="math-image" alt="Math Formula"/>
            <img src={Congthuc10Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p><b>Hãy suy nghĩ về điều này:</b></p>
            <p>Khối lượng của một quả bóng chày là 145 gam và khối lượng của một quả bóng bowling có thể lớn hơn 22.000 gam. Bạn sẽ có khả năng ném cái nào qua không trung với tốc độ lớn hơn?</p>
            <p>Bởi vì giá trị của tỷ lệ giữa các tỷ lệ lớn hơn 1.00, tử số, tỷ lệ cho N<sub>2</sub>, có giá trị lớn hơn. Vì khí nitrogen nhẹ hơn về khối lượng, nó nên di chuyển với tốc độ nhanh hơn. Tính toán mật độ của các khí này,
            <img src={Congthuc11Chapter2} className="math-image" alt="Math Formula"/>
            <img src={Congthuc12Chapter2} className="math-image" alt="Math Formula"/>
            <br/>
            bạn có thể thấy rằng mật độ và tốc độ khuếch tán có tỷ lệ nghịch đảo, N2 có tốc độ khuếch tán cao hơn và mật độ thấp hơn.
            </p>
            </Panel> 
            <Panel header="XIII. Định luật Khí lý tưởng - Liên quan đến Áp suất, Thể tích, Nhiệt độ và Mol" key="13" className='Panel'>
            <p>Định luật Khí lý tưởng được xuất phát từ Lý thuyết phân tử chuyển động. Bây giờ sau khi bạn đã xem xét một số định luật của khí, bạn có thể diễn đạt lại Lý thuyết phân tử chuyển động và nhận ra rằng theo lý tưởng, các phân tử khí:</p>
            <p>•&nbsp;Nên cách xa nhau càng xa càng tốt (áp suất thấp và nhiệt độ cao là điều kiện tốt nhất cho điều này)</p>
            <p>•&nbsp;Nên có càng ít khối lượng càng tốt (như H<sub>2</sub> hoặc He)</p>
            <p>•&nbsp;Nên không có sự hấp dẫn với nhau</p>
            <p>Cần lưu ý rằng các khí thực sự không tuân theo tính lý tưởng, và có các phương trình có thể điều chỉnh các tính toán để bù đắp cho tình huống không lý tưởng. Tuy nhiên, những phương trình này là phức tạp và nằm ngoài phạm vi của bài đánh giá này.
Theo định nghĩa, một khí lý tưởng tuân theo phương trình PV = nRT. Bạn sẽ nhận thấy hai biến mới trong phương trình này, n và R. Biến n đại diện cho số mol của khí và R là một hằng số. Trước khi bạn có thể sử dụng phương trình này, bạn phải trở nên quen với khái niệm mol và ý nghĩa của nó.
            </p>
            <p>Nếu bạn mua một tá trứng, bạn mong đợi mở hộp và tìm thấy bên trong 12 quả trứng. Thuật ngữ "tá" được sử dụng như một thay thế cho từ "mười hai". Cùng một ý tưởng áp dụng khi sử dụng thuật ngữ "mol". Một mol của "một cái gì đó" bằng với 6.02 × 1023 "đối tượng" đó. Ví dụ, một mol nguyên tử cacbon là 6.02 × 1023 nguyên tử cacbon. Số 6.02 × 1023 cũng được biết đến với tên là Số Avogadro.
            <br/>
            Còn với hằng số R, giá trị của hằng số này phụ thuộc vào các đơn vị được sử dụng cho áp suất, nhiệt độ và thể tích. Khi bạn sử dụng các đơn vị thông thường của lít, atmosphere và Kelvin, giá trị và đơn vị là 0.0820 (L•atm)/(mol•K).
            </p>
            <p><b>Bài toán:</b> Có bao nhiêu phân tử của khí H2 có mặt trong một mẫu có thể 11.2 lít ở 273 K và áp suất 760 mm Hg?</p>
            <p><b>Giải pháp:</b> Áp suất là 760 mm Hg; điều này bằng 1.0 atm. Thể tích của khí là 11.2 lít và nhiệt độ là 273 K. Từ trên, bạn biết rằng R = 0.0820 (L•atm)/(mol•K). Định luật Khí lý tưởng là PV = nRT. Thay thế cho phương trình ta có: (1.0 atm)(11.2 L) = (n)(0.0820L•atm)/(mol•K)(273 K).
            <img src={Congthuc13Chapter2} className="math-image" alt="Math Formula"/>
            </p>
            <p>Giải pháp cho kết quả là 0.50 mol khí H<sub>2</sub>. Vì một mol của một khí chứa 6.02 × 1023 phân tử của khí, 0.50 mol của khí sẽ chứa một nửa số Avogadro, tức là 3.01 × 1023 phân tử khí H<sub>2</sub>.</p>
            </Panel>
            <Panel header="XIV. Chất lỏng" key="14" className='Panel'>
            <p>Chất lỏng được đặc trưng bởi thể tích xác định của chúng. Khác với khí, chất lỏng (đa phần) không thể được nén. Chất lỏng, giống như khí, không có hình dạng xác định và sẽ có hình dạng của bình chứa mà chúng được đặt vào. Các phân tử của chất lỏng liên tục tiếp xúc với nhau do những lực tồn tại giữa chúng và giữ chúng lại. Tuy nhiên, những lực này không đủ mạnh để giữ các phân tử ở một vị trí cố định như trong trường hợp của chất rắn.</p>
            <p>Chất lỏng liên tục bay hơi tại bề mặt của chúng. Đó là, các phân tử ở bề mặt của chất lỏng có thể đạt đủ năng lượng động để vượt qua các lực giữa chúng và chuyển sang pha khí. Quá trình này được gọi là sự hơi bốc, hoặc bay hơi. Khi các phân tử của chất lỏng chuyển sang pha khí, chúng rời khỏi pha chất lỏng với một lượng lực nhất định. Lượng lực này được gọi là áp suất hơi. Áp suất hơi phụ thuộc vào nhiệt độ của chất lỏng. Hãy nghĩ về một nồi nước đang được hâm nóng để chuẩn bị bữa tối. Nước bắt đầu lạnh và bạn không thấy hơi nước. Khi nhiệt độ của nước tăng lên, bạn bắt đầu thấy hơi nước nhiều hơn. Khi nhiệt độ của các phân tử nước tăng lên, các phân tử có thêm năng lượng động, cho phép chúng rời khỏi pha chất lỏng với áp suất và lực lượng nhiều hơn. Bạn có thể kết luận rằng khi nhiệt độ của một chất lỏng tăng lên, áp suất hơi cũng tăng lên. Đây là một mối quan hệ trực tiếp.</p>
            </Panel>
            <Panel header="XV. Điểm sôi" key="15" className='Panel'>
            <p>Như đã đề cập trước đó, điểm sôi của nước là 100°C hoặc 373 K. Tại sao hiện tượng này xảy ra ở nhiệt độ này? Liệu nó luôn xảy ra ở nhiệt độ này không? Đúng là nước sẽ sôi ở 100°C hoặc 373 K miễn là áp suất khí quyển là 760 torr. Một nhiệt độ 100°C hoặc 373 K được gọi là điểm sôi bình thường của nước, nhiệt độ mà nước sẽ sôi khi áp suất khí quyển là 760 torr. Nhưng tại sao nước lại sôi ở nhiệt độ này? Khi nước được đun nóng đến 373 K, áp suất hơi của phân tử nước là 760 torr, áp suất hơi chính xác như áp suất khí quyển! Điều này giải đáp câu hỏi: Một chất lỏng sôi khi áp suất khí quyển bằng với áp suất hơi của chất lỏng.</p>
            <p>Liệu nước luôn sôi ở 100°C không? Không, vì áp suất khí quyển có thể thay đổi. Nếu có một hệ thống áp suất thấp ở khu vực bạn sống, áp suất khí quyển thấp và nước sẽ sôi ở một nhiệt độ dưới 100°C do cần một nhiệt độ thấp hơn để đạt được áp suất hơi yêu cầu thấp hơn.</p>
            <p><b>Hãy nghĩ về điều này:</b> Bạn đã bao giờ nghe câu "Nồi sôi không bao giờ sôi chưa?" Chắc hẳn người đang theo dõi và đợi nồi sôi đang ở một khu vực có hệ thống áp suất cao. Trong tình huống này, cần một nhiệt độ cao hơn để làm cho nước sôi.</p>
            </Panel>
            <Panel header="XVI. Chất rắn" key="16" className='Panel'>
           <p>Chất rắn được đặc trưng bởi hình dạng và thể tích xác định của chúng. Các nguyên tử trong chất rắn có một kết cấu hình học cố định, cứng cáp và đều đặn. Những tính chất này phát sinh từ việc các nguyên tử trong chất rắn liên tục rung động, nhưng lại rung tại chỗ. Khi chất rắn được nung nóng đến nhiệt độ đủ cao, chúng có đủ năng lượng động học để trải qua quá trình nóng chảy và chuyển thành chất lỏng. Điểm nóng chảy của một chất rắn là nhiệt độ mà quá trình này xảy ra. Khi một chất lỏng chuyển thành chất rắn, quá trình này được gọi là đóng băng. Cần lưu ý rằng điểm nóng chảy và điểm đóng băng của một chất rắn có cùng nhiệt độ. Ví dụ, đá nóng chảy ở 273 K và nước đóng băng ở 273 K. Đây là lý do tại sao chất rắn và chất lỏng thường được liệt kê cùng nhau trong các biểu đồ biến đổi pha tiếp theo.</p>
            </Panel>
            <Panel header="XVII. Sự thăng hoa và sự lắng đọng" key="17" className='Panel'>
            <p>Làm thế nào mà khi bạn mua kem từ người bán trên một công viên vào một ngày hè nóng, tờ bao bọc kem không bị ướt bởi "đá" dùng để giữ lạnh? Liệu người bán có sử dụng đá không? "Đá khô" là thuật ngữ chỉ khí CO2 ở dạng rắn. Đá khô có thể chuyển từ pha rắn trực tiếp sang pha khí mà không có trạng thái lỏng trung gian rõ ràng. Quá trình này được gọi là sự sublime. Một số chất khác cũng có thể sublime như bóng đèn cầu vồng (naftalen) và iodine rắn. Lắng có thể được hiểu là "ngược lại của" sublime. Trong quá trình này, một khí sẽ chuyển thành chất rắn, một lần nữa mà không có trạng thái lỏng trung gian rõ ràng.</p>
            <img alt="Hình 2.6" src={Hinhchapter26} className="Hinhchapter"></img>

            </Panel>
            <Panel header="XVIII. Các sự thay đổi của pha" key="18" className='Panel'>
            <p>Matter có thể tồn tại ở ba pha: chất rắn, chất lỏng và khí. Hình 2.6 tóm tắt các tên của các thay đổi mà các pha có thể trải qua.</p>
            <p>Một đường cong nhiệt cũng hữu ích khi quan sát các thay đổi pha theo thời gian. Hình 2.7 là một ví dụ về một đường cong nhiệt, cụ thể là đường cong nhiệt cho nước.
Trong biểu đồ này, nhiệt độ được áp dụng cho mẫu đá. Nhiệt độ của đá sẽ tăng lên cho đến khi đạt đến 0°C. Tại điểm này, pha rắn và pha lỏng tồn tại cùng một lúc. Lưu ý rằng không có sự thay đổi trong năng lượng động trung bình trong suốt quá trình thay đổi pha. Nếu nhiệt độ đang được thêm vào và không có sự thay đổi trong năng lượng động trung bình, thì mẫu phải đang tích luỹ năng lượng tiềm năng. Sau khi tất cả đá đã trở thành nước, nhiệt độ (năng lượng động trung bình) sẽ tăng lên lại cho đến khi đạt đến điểm sôi. Một lần nữa, có một thay đổi pha và mẫu đang tích luỹ năng lượng tiềm năng trong khi thay đổi pha diễn ra.
            </p>
            <p>Một biểu đồ pha hữu ích khi xem xét ảnh hưởng của nhiệt độ và áp suất đối với một chất. Vì áp suất có thể ảnh hưởng đến thể tích của khí và điểm sôi của chất lỏng, hiểu các mối quan hệ được miêu tả trong biểu đồ pha là hữu ích. Hình 2.8 thể hiện một biểu đồ pha chung.</p>
            <p>Trong biểu đồ pha, các vùng đại diện cho các pha khác nhau của chất, và các đường chỉ ra điều kiện nơi các chuyển pha xảy ra. Ví dụ, đường phân chia giữa vùng chất rắn và chất lỏng là điểm nóng chảy, và đường phân chia giữa vùng chất lỏng và khí là điểm sôi. Điểm mà ba pha gặp nhau được gọi là điểm tam giác.
Hãy đi sâu vào việc hiểu về các thay đổi pha và đường cong nhiệt. điểm của chất lỏng, quan trọng là không bỏ qua áp suất khi xem xét sự thay đổi trong pha. Một biểu đồ pha tổng quát được hiển thị trong Hình 2.8.
            </p>
            <p>Điểm mà ba pha rắn, lỏng và khí có thể tồn tại cùng một lúc, với một nhiệt độ và áp suất cụ thể, được gọi là điểm tam giác. Đối với H<sub>2</sub>O, điểm tam giác tồn tại khi áp suất là 4.57 atm và nhiệt độ là 0.01°C.</p>
            <img alt="Hình 2.7" src={Hinhchapter27} className="Hinhchapter"></img>
            <img alt="Hình 2.8" src={Hinhchapter28} className="Hinhchapter"></img>

            </Panel>
          </Collapse>
        </div>
      </div>  
    );
  }

export default Chapter2thongtin;