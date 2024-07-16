import React from 'react';
import { Collapse} from 'antd';
import "./Chapter6thongtin.css"
import Hinhchapter61 from "../Hinhchapter/Chapter6.1.png";
import Hinhchapter62 from "../Hinhchapter/Chapter6.2.png";
import Hinhchapter63 from "../Hinhchapter/Chapter6.3.png";
import Hinhchapter64 from "../Hinhchapter/Chapter6.4.png";

import Congthuc1Chapter6  from "../Hinhchapter/Congthuc1Chapter6.png"
import Congthuc2Chapter6  from "../Hinhchapter/Congthuc2Chapter6.png"

import Congthuc3Chapter6  from "../Hinhchapter/Congthuc3Chapter6.png"
import Congthuc4Chapter6  from "../Hinhchapter/Congthuc4Chapter6.png"
import Congthuc5Chapter6  from "../Hinhchapter/Congthuc5Chapter6.png"
import Congthuc6Chapter6  from "../Hinhchapter/Congthuc6Chapter6.png"
import Congthuc7Chapter6  from "../Hinhchapter/Congthuc7Chapter6.png"
import Congthuc8Chapter6  from "../Hinhchapter/Congthuc8Chapter6.png"
import Congthuc9Chapter6  from "../Hinhchapter/Congthuc9Chapter6.png"
import Congthuc10Chapter6  from "../Hinhchapter/Congthuc10Chapter6.png"
import Congthuc11Chapter6  from "../Hinhchapter/Congthuc11Chapter6.png"
import Congthuc12Chapter6  from "../Hinhchapter/Congthuc12Chapter6.png"
import Congthuc13Chapter6  from "../Hinhchapter/Congthuc13Chapter6.png"
import Congthuc14Chapter6  from "../Hinhchapter/Congthuc14Chapter6.png"
import Congthuc15Chapter6  from "../Hinhchapter/Congthuc15Chapter6.png"
import Congthuc16Chapter6  from "../Hinhchapter/Congthuc16Chapter6.png"
import Congthuc17Chapter6  from "../Hinhchapter/Congthuc17Chapter6.png"
import Congthuc18Chapter6  from "../Hinhchapter/Congthuc18Chapter6.png"
import Congthuc19Chapter6  from "../Hinhchapter/Congthuc19Chapter6.png"
import Congthuc20Chapter6  from "../Hinhchapter/Congthuc20Chapter6.png"
import Congthuc21Chapter6  from "../Hinhchapter/Congthuc21Chapter6.png"
import Congthuc22Chapter6  from "../Hinhchapter/Congthuc22Chapter6.png"

import Bang1Chapter6  from "../Hinhchapter/Bang1Chapter6.png"
import Bang2Chapter6  from "../Hinhchapter/Bang2Chapter6.png"



const { Panel } = Collapse;
function Chapter6thongtin() {
    return (
      <div id="faq" className="block faqBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Phép cân bằng hóa học và giải pháp hóa học</h2>
          </div>
          <Collapse defaultActiveKey={['1']} size="large">
            <Panel header="I. Công thức hóa học" key="1" className='Panel'>
            <p>Công thức hóa học không chỉ cho biết những nguyên tố nào có trong hợp chất mà còn cho biết hàm lượng của mỗi nguyên tố. Có ba loại công thức hóa học khác nhau cần được kiểm tra. Biểu đồ dưới đây cho thấy sự khác biệt chính giữa chúng.</p>
            <img alt="Bảng 5" src={Bang1Chapter6} className="Bangchapter"></img>
            <p><b>Vấn đề:</b></p>
            <p>Một hợp chất có công thức thực nghiệm là CH₂ và có khối lượng mol là 70 gram/mol. Công thức phân tử của hợp chất này là gì?</p>
            <p><b>Giải pháp:</b> Công thức thực nghiệm CH₂ có khối lượng là 14. Chia 70 cho 14 để thấy rằng có năm đơn vị CH₂ trong hợp chất này. Điều này có nghĩa là công thức phân tử là C₅H₁₀.</p>
            </Panel>
            <Panel header="II. Cân bằng phương trình hóa học" key="2" className='Panel'>
            <p>Cân bằng một phương trình hóa học đòi hỏi sự hiểu biết về Định luật bảo toàn khối lượng, trong đó nói rằng khối lượng không thể được tạo ra hay phá hủy. Khối lượng các chất tham gia phản ứng sẽ bằng khối lượng các chất sản phẩm. Công lao cho khám phá này được trao cho Antoine Lavoisier, người đã thực hiện các phép đo rất cẩn thận về số lượng hóa chất và thiết bị mà ông sử dụng. Sự bảo toàn khối lượng cũng đúng khi cân bằng các phương trình. Số nguyên tử của mỗi nguyên tố trong chất phản ứng sẽ bằng số nguyên tử của từng nguyên tố trong sản phẩm. Một công cụ ghi nhớ hữu ích để bảo toàn khối lượng là “Cái gì vào thì phải ra”.</p>
            <p>Hai quy tắc quan trọng nhất cần nhớ khi cân bằng phương trình là:</p>
            <p>• Bạn chỉ có thể thay đổi các hệ số.</p>
            <p>• Bạn phải sử dụng hệ số nguyên thấp nhất</p>
            <p>Bây giờ hãy thêm một quy tắc không chính thức nữa vào những quy tắc được liệt kê ở trên:</p>
            <p>Để lại chất đơn giản nhất cho đến cuối cùng:</p>
            <p>• Để lại chất đơn giản nhất cho đến cuối cùng.</p>
            <p>Từng bước bạn có thể cân bằng một phương trình. Hãy thử ví dụ này:</p>
            <p>Al + O₂ → Al₂O₃</p>
            <p>Kiểm tra cho thấy rằng bạn nên để chất phản ứng Al ở cuối cùng vì nó “đơn giản nhất” và không liên kết với bất kỳ nguyên tố nào khác. Kiểm tra cũng cho thấy hai nguyên tử oxygen tham gia phản ứng và ba nguyên tử rời khỏi phản ứng. Số hai và số ba là ước số của số sáu. Do đó, bạn có thể thay đổi các hệ số trước các chất chứa oxy và nhận được:</p>
            <p>Al + 3O₂ → 2Al₂O₃</p>
            <p>Điều này hiện cho thấy tổng cộng sáu nguyên tử oxygen là chất phản ứng và sáu nguyên tử oxygen là sản phẩm. Các hệ số này là bội số và không chỉ thay đổi số lượng nguyên tử oxygen mà còn thay đổi số lượng nguyên tử nhôm trong aluminium oxide. Bây giờ bạn có bốn nguyên tử nhôm ở vế phải của phương trình. Để cân bằng điều này, đặt hệ số 4 trước Al ở phía chất phản ứng và nhận được:</p>
            <p>4Al + 3O₂ → 2Al₂O₃</p>
            <p>Liệu tất cả có cộng lại không? Bốn nguyên tử nhôm và sáu nguyên tử oxy nằm ở phía chất phản ứng của phương trình và bốn nguyên tử nhôm và sáu nguyên tử oxy nằm ở phía sản phẩm của phương trình.</p>
            <p><b>Vấn đề:</b></p>
            <p>Cân bằng các phương trình hóa học sau:</p>
            <p>1. Zn + HCl → H₂ + ZnCl₂</p>
            <p>2.	SiO₂ + HF → SiF₄ + H₂O</p>
            <p>3.	SiCl₄ + Mg → Si + MgCl₂</p>
            <p>4.	H₂ + N₂ → NH₃</p>
            <p>5.	SO₃ → S + O₂</p>
            <p><b>Giải pháp:</b></p>
            <p>1. Zn + 2HCl → H₂ + ZnCl₂</p>
            <p>2.	SiO₂ + 4HF → SiF₄ + 2H₂O</p>
            <p>3.	SiCl₄ + 2Mg → Si + 2MgCl₂</p>
            <p>4.	3H₂ + N₂ → 2NH₃</p>
            <p>5.	2SO₃ → 2S + 3O₂</p>
            <p>Ngoài việc cân bằng các phương trình hóa học, bạn còn có thể phân loại các loại phản ứng xảy ra. Có bốn loại phản ứng: tổng hợp, phân hủy thay thế đơn và thay thế kép. Giải thích và ví dụ của từng như sau:</p>
            <p>• Trong phản ứng tổng hợp, nhiều chất kết hợp với nhau tạo thành một hợp chất:</p>
            <p>A + B → AB</p>
            <p>• Trong phản ứng phân hủy, một hợp chất phân hủy thành nhiều chất:</p>
            <p>YZ → Y + Z</p>
            <p>• Trong một phản ứng thay thế duy nhất, một nguyên tố thay thế một nguyên tố khác.</p>
            <p>AB + C → CB + A</p>
            <p>• Trong phản ứng thay thế kép, hai yếu tố “đổi nhau”:</p>
            <p>AB + XY → AY + XB</p>
            <p><b>Vấn đề:</b></p>
            <p>Phân loại năm phương trình cân bằng ở trên thành thay thế đơn, thay thế kép, tổng hợp hoặc phân rã.</p>
            <p><b>Giải pháp:</b></p>
            <p>1. Thay thế một lần</p>
            <p>2.	Thay thế kép</p>
            <p>3.	Thay thế một lần</p>
            <p>4.	Tổng hợp</p>
            <p>5.	Phân hủy</p>
            </Panel>
            <Panel header="III. Tỉ lệ mol" key="3" className='Panel'>
            <p>Bạn đã gặp các bài toán liên quan đến mol, phân tử và khối lượng mol ở phần trước của cuốn sách này. Vẫn còn một mối quan hệ khác cần được kết nối với số mol và đó là thể tích mol. Một khi bạn tạo được mối liên hệ giữa mol với thể tích, khối lượng và phân tử, bạn sẽ có thể giải quyết vấn đề một cách dễ dàng. Một công cụ ghi nhớ rất hữu ích có thể sử dụng là Mole-Go-Round. Một số người nghĩ phương pháp này là một cách "gian lận hệ thống", nhưng vì kỳ thi SAT II không yêu cầu bạn phải trình bày bài làm nên Vòng tròn Mole-Go-Round là một phương pháp hoàn toàn có thể chấp nhận được để đạt được kết quả tốt hơn.</p>
            <p>Vậy Mole-Go-Round này là gì? Đó là một sơ đồ đơn giản thể hiện mối quan hệ giữa nốt ruồi và các yếu tố khác. Vòng Mole-Go-Round được thể hiện trong Hình 6.1.</p>
            <p>Số mol nằm ở giữa vì khi bạn biết có bao nhiêu mol của một mẫu thì bạn có thể thực hiện chuyển đổi để tìm ra các đại lượng khác. Hãy lưu ý hai điều này:</p>
            <p>Bắt đầu với phương trình cân bằng: 4Al + 3O₂ → 2Al₂O₃.</p>
            <p>Thiết lập một tỷ lệ:</p>
            <img src={Congthuc3Chapter6} className="math-image" alt="Math Formula"/>
            <p>Giải: 2x = 4.000. x = 2.000 mol Al.</p>
            <p>Để giải số mol khí oxygen, hãy sử dụng phép phân tích thứ nguyên:</p>
            <img src={Congthuc4Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Vấn đề:</b></p>
            <p>Quy trình Haber là phương pháp sản xuất amoniac theo phương trình 3H₂ + N₂ → 2NH₃. Cần bao nhiêu mol khí nitrogen và khí hydrogen để tạo ra 700 mol ammonium?</p>
            <p><b>Giải pháp: Bắt đầu với phương trình cân bằng: 3H₂ + N₂ → 2NH₃</b></p>
            <p>Thiết lập một tỷ lệ:</p>
            <img src={Congthuc5Chapter6} className="math-image" alt="Math Formula"/>
            <p>Giải: 2x = 2,100.	x = 1050 mol H₂.</p>
            <p>Làm tương tự đối với N₂ thông qua phân tích thứ nguyên cho thấy cũng cần 350 mol N₂:</p>
            <img src={Congthuc6Chapter6} className="math-image" alt="Math Formula"/>
            </Panel>
            <Panel header="IV. Mol, khối lượng, khối lượng và phân tử" key="4" className='Panel'> 
            <p>Bạn đã gặp các bài toán liên quan đến mol, phân tử và khối lượng mol ở phần trước của cuốn sách này. Vẫn còn một mối quan hệ khác cần được kết nối với số mol và đó là thể tích mol. Một khi bạn tạo được mối liên hệ giữa mol với thể tích, khối lượng và phân tử, bạn sẽ có thể giải quyết vấn đề một cách dễ dàng. Một công cụ ghi nhớ rất hữu ích có thể sử dụng là Mole-Go-Round. Một số người cho rằng phương pháp này là một cách "gian lận hệ thống", nhưng vì kỳ thi SAT II không yêu cầu bạn phải trình bày bài làm nên Vòng tròn chuột chũi là một phương pháp hoàn toàn có thể chấp nhận được để đạt được kết quả tốt hơn.</p>
            <p>Vậy Mole-Go-Round này là gì? Đó là một sơ đồ đơn giản thể hiện mối quan hệ giữa nốt ruồi và các yếu tố khác. Vòng Mole-Go-Round được thể hiện trong Hình 6.1.</p>
            <p>Số mol nằm ở giữa vì khi bạn biết có bao nhiêu mol của một mẫu thì bạn có thể thực hiện chuyển đổi để tìm ra các đại lượng khác. Hãy lưu ý hai điều này:</p>
            <p>Khi chuyển đổi sang mol, phép toán là phép chia, trong khi mol “eXiting” yêu cầu phép toán phải là phép nhân. (Chữ “X” đã được nhấn mạnh để các bạn nhớ nhân.)</p>
            <img alt="Hình 5." src={Hinhchapter61} className="Hinhchapter"></img>
            <p>Hệ số giữa gram và khối lượng mol sẽ khác nhau tùy thuộc vào khối lượng mol của hợp chất được đề cập.</p>
            <p><b>Vấn đề:</b></p>
            <p>Cho một mẫu 22,0 gram CO₂(g) ở STP, mẫu này sẽ chiếm bao nhiêu lít? Có bao nhiêu phân tử?</p>
            <p><b>Giải pháp: Bắt đầu với phương trình cân bằng: 3H₂ + N₂ → 2NH₃</b></p>
            <p>Vấn đề này bắt đầu ở phần “khối lượng” của Vòng quay mol. Bạn có 22,0 gram CO₂. (Chú ý cách ghi số [22,0], đơn vị [gram] và chất [CO₂] trong từng bước của bài toán.) Bước tiếp theo là chuyển đổi sang mol bằng cách chia cho khối lượng mol. Khối lượng mol của CO2 là 44,0 gram/mol. Điều này tạo ra 0,50 mol CO₂ như trong Hình 6.2.</p>
            <img alt="Hình 5." src={Hinhchapter62} className="Hinhchapter"></img>
            <p>Bước tiếp theo là chuyển đổi 0,50 mol CO2 thành thể tích mol và số lượng phân tử. Điều này được thực hiện bằng cách nhân 0,50 mol với 22,4 lít và sau đó nhân 0,50 mol với 6,02 × 1023 như trong Hình 6.3.</p>
            <img alt="Hình 5." src={Hinhchapter63} className="Hinhchapter"></img>
            <p><b>Vấn đề khối lượng và thể tích:</b></p>
            <p>Biết cách chuyển đổi số mol thành khối lượng và thể tích sẽ mở ra một loạt các loại vấn đề khác có thể giải được. Ở phần trước của chương này, bạn đã biết cần bao nhiêu mol chất phản ứng để tạo ra một số lượng sản phẩm nhất định. Nhưng bạn cũng có thể được yêu cầu tạo ra một lượng sản phẩm nhất định tính bằng gram thay vì mol hoặc tìm lượng chất phản ứng cần thiết tính bằng gram. Loại bài toán này được gọi là bài toán khối lượng và nó có thể được giải bằng Vòng tròn chuột chũi và ba bước đơn giản.</p>
            <p>Hãy xem xét những điều sau đây: C(s) + O₂(g) → CO₂(g). Đốt cháy 120 gram carbon có thể tạo thành bao nhiêu gram khí carbon dioxide? Giả sử một lượng oxygen dồi dào.</p>
            <p>1.	120 gram C được chuyển thành mol bằng cách chia cho khối lượng nguyên tử cacbon. 120 gram chia cho 12 được 10 mol C(s).</p>
            <p>2.	Sử dụng tỷ lệ mol từ phương trình đã cân bằng và thay thế lượng chất phản ứng mới:10 mol carbon dioxide được tạo ra vì cứ mỗi người sử dụng một mol carbon thì sẽ tạo ra một mol carbon dioxide.</p>
            <img src={Congthuc7Chapter6} className="math-image" alt="Math Formula"/>
            <p>3.	Chuyển đổi 10 mol CO₂ thành gram, như yêu cầu trong bài toán. Để chuyển đổi số mol thành khối lượng, số mol được nhân với khối lượng mol (44 gram/mol). 440 gram carbon dioxide sẽ được tạo ra.</p>
            <p><b>Vấn đề:</b></p>
            <p>Có thể tạo ra bao nhiêu gram NaCl từ phản ứng của 46 gram Na với đủ Cl2 theo phương trình 2Na(s) + Cl₂(g) → 2NaCl(s)?</p>
            <p><b>Giải pháp:</b> Chuyển đổi gram đã cho thành nốt ruồi. 46 gram Na 23 gram/mol = 2,0 mol Na. Sử dụng tỉ lệ mol.</p>
            <img src={Congthuc8Chapter6} className="math-image" alt="Math Formula"/>
            <p>Ta thấy rằng một số lượng bằng nhau, 2,0 mol NaCl được tạo ra</p>
            <p>Chuyển đổi 2,0 mol NaCl thành gram NaCl bằng cách nhân với khối lượng mol 58,5 gram/mol = 117 gram NaCl.</p>
            <p>Các hệ số có thể chỉ ra một đại lượng khác: khối lượng. Khi các phản ứng chứa chất khí, với điều kiện là các điều kiện như nhau (nhiệt độ và áp suất), các hệ số có thể biểu thị số lượng “thể tích” của chất khí có mặt. Xét quá trình đốt cháy khí metan: CH₄(g) + 2O₂(g) → 2H₂O(g) + CO₂(g). Tỷ lệ mol của các khí này cũng là tỷ lệ thể tích của chúng. Hãy xem xét việc sản xuất khí nhà kính CO₂ nổi tiếng. Đốt 50 lít CH₄ có thể tạo ra bao nhiêu lít CO₂? Lập tỉ số và giải:</p>
            <img src={Congthuc9Chapter6} className="math-image" alt="Math Formula"/>
            <p>Tỷ lệ được thiết lập ở trên cho thấy rằng 50 lít khí carbon dioxide được tạo ra.</p>
            </Panel>
            <Panel header="V. Thuốc thử hạn chế và dư thừa" key="5" className='Panel'>
            <p>Các nguyên tử và phân tử phản ứng theo tỷ lệ và lượng cụ thể như được trình bày trong suốt chương này. Trung tâm của tỷ lệ và tỷ lệ là nốt ruồi. Điều gì xảy ra khi các chất phản ứng không được đo lường theo số lượng cụ thể mà chỉ đơn giản là “ném vào nhau”? Tất cả các chất phản ứng sẽ phản ứng? Điều này không xảy ra với các phản ứng hóa học. Các chất phản ứng phản ứng theo tỷ lệ và tỷ lệ nhất định và đôi khi sẽ có thuốc thử dư thừa.</p>
            <p>Hãy xem xét món bánh mì kẹp thịt balô được làm cho bữa trưa của bạn khi bạn còn học tiểu học. Giả sử chiếc bánh sandwich yêu thích của bạn có hai lát bánh mì và ba lát bánh mì kẹp thịt. Trong tủ lạnh có bốn lát bánh mì và bảy lát bánh ngọt. Bạn thật may mắn vì bây giờ bạn có thể làm hai chiếc bánh sandwich từ bốn lát bánh mì và sáu lát bánh mì kẹp thịt. Nhưng một trong những miếng balo ban đầu bây giờ vẫn còn sót lại. Một lát baloney là quá nhiều. “Chất dư” trong phản ứng hóa học được gọi là thuốc thử dư. Những chất được sử dụng hết gọi là thuốc thử hạn chế. Thuốc thử hạn chế cho bữa trưa của bạn là bánh mì.</p>
            <p>Xét phản ứng sau: HCl + NaOH → NaCl + H₂O. HCl và NaOH được tiêu thụ theo tỷ lệ 1:1. Nếu hai mol HCl phản ứng với một mol NaOH thì thừa một mol HCl vì chỉ cần một mol phản ứng với một mol NaOH. Bây giờ hãy xem xét những điều sau: 2H₂ + O₂ → 2H₂O. Có thể tạo ra bao nhiêu gram nước từ 8,0 gram H₂ và 96,0 gram O₂?</p>
            <p>Bắt đầu bằng cách chuyển đổi sang số mol vì phương trình cân bằng hiển thị tỷ lệ mol chứ không phải tỷ lệ gram.</p>
            <p>1.	8.0 gram H₂ ÷ 2 gram/mol = 4.0 mol H₂.</p>
            <p>2.	96.0 gram O₂ ÷ 32 gram/mol = 3.0 mol O₂.</p>
            <p>Để phản ứng 4,0 mol H₂, bạn cần 2,0 mol O₂ vì, theo phương trình cân bằng, hai mol khí hydrogen phản ứng với một mol khí oxygen, tỷ lệ 2:1. Vì có 3,0 mol khí oxygen và chỉ cần 2,0 mol nên khí oxygen bị dư và khí hydrogen là thuốc thử hạn chế. Đây là một cách nhìn khác: để phản ứng với tất cả 3,0 mol khí oxygen, bạn sẽ cần 6,0 mol khí hydrogen, một lượng không có sẵn và một lần nữa dán nhãn khí hydrogen là thuốc thử giới hạn.</p>
            <p><b>Vấn đề:</b></p>
            <p>Potassium and bromine sẽ phản ứng theo phương trình: 2K + Br2 → 2KBr. Nếu 117 gram potassium phản ứng với 160 gram nước bromine thì có thể tạo ra bao nhiêu mol KBr?</p>
            <p><b>Giải pháp:</b> Chuyển đổi khối lượng đã biết từ gram sang mol:</p>
            <p>117 gram K ÷ 39 gram/mol = 3.0 mol K; 160 gram Br₂ ÷ 160 gram/mol = 1.0 mol Br₂</p>
            <p>Bằng cách kiểm tra, bạn thấy rằng ba mol K sẽ cần 1,5 mol Br₂ vì theo phương trình cân bằng 2K + Br₂ → 2KBr, tỷ lệ giữa K và Br₂ là 2:1. Lượng brom có mặt chỉ là 1,0 mol và điều này sẽ làm cho bromine trở thành thuốc thử hạn chế. Vì chỉ có 1,0 mol Br₂ có thể phản ứng nên chỉ sử dụng 2,0 mol potassium. Điều này sẽ chỉ mang lại 2,0 mol KBr, như được xác định bởi phương trình cân bằng.</p>
            </Panel>
            <Panel header="VI. Thành Phần Phần Trăm" key="6" className='Panel'>
            <p>Thành phần phần trăm, còn được gọi là phần trăm khối lượng, là một phần dữ liệu hữu ích cần có khi xem xét thành phần của một số chất. Trong bài toán thành phần phần trăm, bạn được yêu cầu tìm phần trăm khối lượng của một nguyên tố trong một hợp chất so với khối lượng mol của hợp chất đó. Một tỷ lệ đơn giản là đủ và kết quả được nhân với 100%. Ví dụ, đối với CaCl₂, bao nhiêu phần trăm của hợp chất này được tạo thành từ clo? Tổng khối lượng là</p>
            <p>(1 nguyên tử Ca × 40 = 40) + (2 nguyên tử Cl × 35.5 = 71) = 111 gram/mol</p>
            <p>Phần trăm khối lượng của chlorine là</p>
            <img src={Congthuc1Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Vấn đề:</b></p>
            <p>Tìm phần trăm khối lượng mỗi nguyên tố trong hợp chất C6H12O6 (khối lượng phân tử = 180).</p>
            <p><b>Giải pháp:</b></p>
            <p>Phần trăm carbon là (72/180) × 100% = 40%</p>
            <p>Phần trăm hydrogen là (12/180) × 100% = 6.7%</p>
            <p>Phần trăm oxygen là (96/180) × 100% = 53.3%</p>
           </Panel> 
            <Panel header="VII. Công thức thực nghiệm từ thành phần phần trăm" key="7" className='Panel'>
            <p>Ở phần trước, các bài toán trình bày công thức hóa học và yêu cầu về thành phần phần trăm. Có một phương pháp để chuyển từ thành phần phần trăm sang công thức hóa học; tuy nhiên, bạn sẽ chỉ thu được công thức thực nghiệm từ điều này. Ba bước xác định công thức thực nghiệm của một hợp chất từ thành phần phần trăm như sau:</p>
            <p>1.	Giả sử một mẫu có khối lượng 100 gram. Điều này sẽ cho phép các ký hiệu phần trăm được viết dưới dạng “gram”.</p>
            <p>2.	Quy đổi số gram của mỗi nguyên tố thành số mol của mỗi nguyên tố.</p>
            <p>3.	Chia số mol mỗi nguyên tố cho số mol nhỏ nhất trong các số.</p>
            <p>Hãy áp dụng lý thuyết vào thực tế: Một mẫu có chứa 58,80% Ba, 13,75% S và 27,45% O. Công thức thực nghiệm của chất này là gì?</p>
            <p>1.	Giả sử một mẫu có khối lượng 100 gram. Điều này cho phép các ký hiệu phần trăm trở thành “gram” và để lại cho chúng ta 58,80 gram Ba, 13,75 gram S và 27,45 gram O.</p>
            <p>2.	Chuyển gram sang mol:</p>
            <p>58.80 gram  Ba ÷ 137.34 gram/mol = 0.43 mol Ba</p>
            <p>13.75 gram S ÷ 32 gram/mol = 0.43 mol S</p>
            <p>13.75 gram S ÷ 32 gram/mol = 0.43 mol S</p>
            <p>Tính đến thời điểm hiện tại, hợp chất này trông giống như Ba<sub>0.43</sub> S<sub>0.43</sub> O<sub>1.72</sub>. Đây là một cách vô lý để viết một công thức thực nghiệm! Vậy bây giờ số mol được chia cho số mol nhỏ nhất là 0,43. Điều này để lại công thức thực nghiệm như BaSO₄</p>
            <p><b>Vấn đề:</b></p>
            <p>Một hợp chất có khối lượng là 14,6% C và 85,4% Cl. Hợp chất này cũng có khối lượng mol là 166 gram/mol. Công thức thực nghiệm và phân tử của hợp chất này là gì?</p>
            <p><b>Giải pháp: Đầu tiên hãy tìm công thức thực nghiệm:</b></p>
            <p>1.	Bạn nhận được 14,6% C và 85,4% Cl; giả sử một mẫu nặng 100 gram, bạn có 14,6 gram C và 85,4 gram Cl.</p>
            <p>2.	14.6 gram C ÷ 12 gram/mol = 1.22 mole C.</p>
            <p>3.	85.4 gram Cl ÷ 35.5 gram/mol = 2.41 mol Cl.</p>
            <p>4.	Chia cho số mol nhỏ nhất</p>
            <img src={Congthuc2Chapter6} className="math-image" alt="Math Formula"/>
            <p>Công thức thực nghiệm là CCl₂.</p>
            <p>5.	Khối lượng của công thức thực nghiệm CCl2 là 83 gram/mol. Hợp chất này có khối lượng mol là 166 gram/mol. Chia 166 cho 83 cho biết có 2 đơn vị của công thức thực nghiệm CCl₂. Công thức phân tử của hợp chất này là C₂Cl₄</p>
            </Panel>
            <Panel header="VIII. Nồng độ và pha loãng" key="8" className='Panel'>
            <p>Hai tách trà được tặng cho hai người đang tận hưởng khoảng thời gian bên nhau. Người A đã gọi một cốc (8 ounce) trà với một cục đường. Người B đã gọi một tách trà “gấp đôi” và nhận được một tách trà lớn gấp đôi (16 ounce). Người B thả hai cục đường vào tách trà lớn hơn. Một cuộc tranh cãi xảy ra về việc trà của ai ngọt hơn. Người B tin rằng tách trà lớn hơn sẽ ngọt hơn vì nó chứa lượng đường gấp đôi. Người A nên nói gì với Người B?</p>
            <p>Sự tập trung có thể được thể hiện bằng nhiều cách khác nhau. Bất kể sự tập trung được thể hiện theo cách nào, nó luôn có một điểm chung. Đó là tỷ lệ giữa chất tan và dung môi. Chất tan là chất bị biến đổi pha khi hòa tan; ví dụ, NaCl(s) trở thành NaCl(aq) khi hòa tan trong nước. Dung môi không thay đổi pha khi hòa tan chất nào đó vào nó.</p>
            <p>Cách phổ biến nhất để thể hiện nồng độ trong hóa học là nồng độ mol.</p>
            <p>Độ mol là tỷ số giữa số mol chất tan và tổng số lít dung dịch:</p>
            <img src={Congthuc10Chapter6} className="math-image" alt="Math Formula"/>
            <p>Hãy chú ý đến thuật ngữ “tổng số lít dung dịch”. Điều này không có nghĩa là thể tích của dung môi vì mẫu số tính tổng thể tích của chất tan và dung môi</p>
            <p><b>Vấn đề:</b></p>
            <p>Độ mol của dung dịch được tạo ra bằng cách hòa tan 117 gram NaCl trong nước vừa đủ để tạo thành 1.000 mL dung dịch là bao nhiêu?</p>
            <p><b>Giải pháp:</b></p>
            <p>• Chuyển gram NaCl thành mol bằng cách chia cho khối lượng mol của NaCl là 58,5 g/mol. 117 gram ÷ 58.5 gram/mol = 2.00 mol NaCl.</p>
            <p>• 1.000 mL dung dịch cần biểu thị bằng lít nên ta quy đổi: 1.000 mL (1 lít /1000 mL) = 1.000 lít</p>
            <img src={Congthuc11Chapter6} className="math-image" alt="Math Formula"/>
            <p>Bây giờ chúng ta lấy dung dịch NaCl 2,00 M đã pha ở trên và thêm nước vào dung dịch. Liệu nồng độ có bị thay đổi không? Bằng cách thêm nước, chúng ta đã thay đổi mẫu số và tăng giá trị của nó. Mẫu số lớn hơn có nghĩa là giá trị tổng thể thấp hơn và nồng độ mol sẽ giảm.</p>
            <p>Giả sử 0,250 lít nước được thêm vào để tạo thành tổng thể tích 1,250 lít dung dịch. Số mol mới là gì? Chúng ta có thể sử dụng phương trình M1V1 = M2V2 để giải nồng độ mol mới của dung dịch đã được pha loãng. Nồng độ mol ban đầu là 2,00 M (M1), thể tích ban đầu là 1,000 L (V1) và thể tích mới là 1,250 L (V2). Nồng độ mol mới sẽ giảm do có thêm nước. Vì vậy, M1V1 = M2V2 và sự thay thế cho:</p>
            <p>(2.00 M)(1.000 L) = (M2)(1.250 L)</p>
            <p>Giải ra ta có nồng độ mol mới = 1,60 M NaCl. Sự tập trung đã giảm như dự đoán.</p>
            <p>Hãy nghĩ mà xem, ngay cả khi không có máy tính thì điều này vẫn khả thi: 1.000 L là 80% của 1.250 L. Do đó, 80% của 2,00 M là 1,60 M.</p>
            <p><b>Vấn đề:</b></p>
            <p>Pha loãng 1,00 lít dung dịch HCl 0,50 M thành 2,0 lít dung dịch. Nồng độ mol mới của dung dịch này là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Sử dụng phương trình: M₁V₁ = M₂V₂ chúng ta thay thế và nhận được:</p>
            <p>(0,50 M)(1,00 L) = (M2)(2,0 L)</p>
            <p>Nồng độ mol cuối cùng là 0,25 M HCl.</p>
            </Panel>
            <Panel header="IX. Thuộc tính chung" key="9" className='Panel'>
            <p>Hướng dẫn nấu mì ống đôi khi yêu cầu thêm muối vào nước nấu mì ống. Thêm chất tan vào dung môi sẽ làm thay đổi tính chất của dung môi. Một số tính chất thay đổi là điểm sôi, điểm đóng băng và áp suất hơi. Mức độ thay đổi có thể xảy ra phụ thuộc vào nồng độ của các hạt trong dung dịch. Cách thể hiện nồng độ này được gọi là <i>molality.</i></p>
            <img src={Congthuc12Chapter6} className="math-image" alt="Math Formula"/>
            <p>Lưu ý rằng phương trình gọi “số mol hạt hòa tan”. Các hợp chất ion có thể phân ly trong dung dịch và tạo thành một số hạt trong dung dịch. Ví dụ, nếu chuẩn bị dung dịch NaCl 1,0 mol, nó sẽ “hoạt động” như thể nó có bản chất là 2,0 mol. Điều này là do mỗi mol NaCl giải phóng hai mol ion (Na+ và Cl−). Đây là một sự khác biệt rất lớn so với một hợp chất như glucose, C6H12O6, trong đó các nguyên tử được liên kết cộng hóa trị và sẽ không phân ly trong dung dịch. Điều đó có nghĩa là dung dịch glucose 1,0 mol sẽ có một mol ở dạng hạt mặc dù một mol glucose có nhiều nguyên tử hơn một mol NaCl có ion.</p>
            <p><b>Vấn đề:</b></p>
            <p>222 gram CaCl₂ được hòa tan trong 2,00 kg nước. Độ mol kết quả của giải pháp này là gì?</p>
            <p><b>Giải pháp: Đầu tiên chuyển đổi số gram CaCl2 thành số mol bằng cách chia cho khối lượng mol (khối lượng mol = 111). Điều này mang lại 2,0 mol CaCl₂. Chia cho 2,00 kg nước ta được:</b></p>
            <img src={Congthuc13Chapter6} className="math-image" alt="Math Formula"/>
            <p>Tuy nhiên, vì canxi clorua tạo ra ba mol ion trên một mol muối nên dung dịch sẽ có tính chất như thể nó có độ sâu 3,0 m. Do đó, đối với các tính toán tiếp theo dưới đây, chúng ta sẽ xử lý dung dịch này ở dạng hạt 3,0 m.</p>
            <p>Bây giờ, nồng độ mol của dung dịch có thể được tính toán, chúng ta có thể kiểm tra thêm xem tính chất chung có thể thay đổi bao nhiêu khi một lượng hạt nhất định được hòa tan trong dung dịch. Khi xem xét ảnh hưởng của điểm sôi và điểm đóng băng, người ta nên nhớ công cụ ghi nhớ sau: “Người giàu càng giàu hơn và người nghèo càng nghèo hơn” nghĩa là điểm sôi tăng lên trong khi điểm đóng băng giảm xuống.</p>
            <p>Điểm sôi của nước sẽ tăng không đổi 0,52°C cho mỗi 1 m chất tan hòa tan trong dung dịch. Chúng ta hãy xem xét lại dung dịch hạt 3,0 m được tạo ra trước đó. Điểm sôi của dung dịch này sẽ là bao nhiêu? Một phép nhân đơn giản cho chúng ta biết rằng:</p>
            <p>3.0 m (0.52°C/1 m) = 1.56°C như sự gia tăng.</p>
            <p>Chúng ta vẫn chưa tìm được điểm sôi mới của dung dịch. Hãy nhớ rằng điểm sôi ban đầu là 100°C. Bây giờ điểm sôi cao hơn 100°C là 1,56°C và đã trở thành 101,56°C.</p>
            <p>Điểm đóng băng của nước sẽ giảm không đổi 1,86°C cho mỗi 1 m chất tan hòa tan trong dung dịch. Để tính toán sự thay đổi điểm đóng băng, chúng tôi thiết lập như sau và nhân:</p>
            <p>3.0 m hạt (1.86°C/1 m) = 5.58°C điểm đóng bang thấp.</p>
            <p>Vì điểm đóng băng ban đầu là 0°C nên điểm đóng băng mới là −5,58°C</p>
            <p><b>Vấn đề:</b></p>
            <p>Hòa tan 400 gram AlCl₃ trong 1 kg nước. Tìm nồng độ mol của dung dịch này. Điểm sôi của dung dịch là gì?</p>
            <p><b>Giải pháp:</b> Chuyển 400 gram AlCl₃ thành mol bằng cách chia cho khối lượng mol 133,5 gram/mol. Điều này mang lại 3,00 mol (đủ gần) AlCl₃.</p>
            <p>Để tìm nồng độ mol chúng ta thiết lập m = (3,00 mol/1,0 kg) = 3,00 m AlCl₃. Tuy nhiên, vì có 4 ion trong mỗi mol nên dung dịch hoạt động như thể nó là các hạt 12,00 m.</p>
            <p>Để tìm độ tăng nhiệt độ sôi, hãy nhân số mol với hằng số:</p>
            <p>12.00 m (0.52°C/1m) = khoảng 6°C.</p>
            <p>Điểm sôi mới sẽ là 100°C + 6°C = 106,00°C hoặc 106,24° (thực tế).</p>
            </Panel>
            <Panel header="X. Độ hòa tan của hợp chất" key="10" className='Panel'>
            <p>Mặc dù có vẻ như là một ý tưởng hay khi sử dụng bất kỳ loại muối nào để làm tan băng hoặc thay đổi nhiệt độ sôi của nước, nhưng không phải mọi loại muối đều có thể hòa tan hoàn toàn trong nước. Một trong những muối không phân ly 100% thành ion là AgCl. AgCl có thể hòa tan trong nước bao nhiêu sẽ được xem xét sau khi chúng ta xem xét các sản phẩm hòa tan trong Chương 8. Bạn cũng nên biết rằng nhiệt độ và lượng dung môi dùng để hòa tan muối cũng làm thay đổi lượng muối có thể hòa tan. Bởi vì có thể sử dụng lượng dung môi khác nhau nên tiêu chuẩn 100 gram nước đã được đặt làm tiêu chuẩn cho đường cong hòa tan. Lượng chất tan tối đa có thể hòa tan trong 100 gram nước được gọi là độ tan của chất tan đó. Lượng này làm cho dung dịch bão hòa. Nếu 100 g dung môi có lượng chất tan ít hơn lượng chất tan tối đa thì dung dịch đó được gọi là chưa bão hòa. Nếu dung môi có thể bị “đánh lừa” để hòa tan nhiều chất tan hơn mức cần thiết để làm cho dung dịch bão hòa thì dung dịch đó được gọi là dung dịch siêu bão hòa.</p>
            <p>Chất khí và chất rắn có xu hướng hòa tan khác nhau khi nhiệt độ của dung dịch thay đổi. Nói chung, độ hòa tan của chất rắn tăng khi nhiệt độ tăng và độ hòa tan của khí giảm khi nhiệt độ tăng. Đồ thị trong Hình 6.4 cho thấy độ hòa tan của KCl và Pb(NO₃)₂ khi nhiệt độ của mẫu nước 100 gram được đun nóng từ 0°C đến 100°C.</p>
            <p>Mặc dù đường cong độ hòa tan có thể khá chi tiết nhưng có một số quy tắc chung có thể được sử dụng để giúp xác định xem chất tan có hòa tan trong nước hay không. Những quy tắc này được nêu dưới đây.</p>
            <img alt="Hình 5." src={Hinhchapter64} className="Hinhchapter"></img>
            <img alt="Bảng 5" src={Bang2Chapter6} className="Bangchapter"></img>
            <p>Các quy tắc được liệt kê trong bảng có thể giúp xác định các muối không hòa tan hình thành trong phản ứng hóa học. Những muối “lắng ra” khỏi dung dịch được gọi là <i>precipitates.</i></p>
            <p><b>Vấn đề:</b></p>
            <p>Xét phản ứng trong nước: 2KI + Pb(NO₃)₂ → PbI₂ + 2KNO₃, chất nào sau đây sẽ được gọi là chất kết tủa dạng nước (aq) hoặc dạng rắn (s)?</p>
            <p><b>Giải pháp: </b>KI hòa tan trong nước; halogen không liên kết với Hg, Pb hoặc Ag. Pb(NO₃)₂ hòa tan vì tất cả nitrat đều hòa tan. PbI₂ không tan trong nước vì ion iodua liên kết với Pb. Cuối cùng, KNO₃ hòa tan vì tất cả nitrat đều hòa tan. Phương trình cuối cùng sẽ trông như thế này:</p>
            <p>2KI(aq) + Pb(NO₃)₂(aq)→ PbI₂(s) + 2KNO₃(aq).</p>
            </Panel>
            <Panel header="XI. Phương trình ion thu gọn" key="11" className='Panel'>
            <p>Bây giờ bạn đã biết các quy tắc về độ hòa tan, bạn có thể xem chính xác chất nào tham gia phản ứng. Trong khi các phản ứng được viết để chỉ ra các chất phản ứng và sản phẩm trong phản ứng tổng thể, không phải mọi chất đều đóng vai trò trong phản ứng. Những chất không tham gia này được gọi là khán giả. Xét phương trình:</p>
            <p>2KI(aq) + Pb(NO₃)₂(aq)→ PbI₂(s) + 2KNO₃(aq).</p>
            <p>Có một chất trong phản ứng này là một khán giả và bạn có thể tìm thấy nó nếu bạn biết các quy tắc hòa tan và cách viết phương trình ion rút gọn.</p>
            <p>Khi viết phương trình ion rút gọn, trước tiên hãy viết tất cả các chất hòa tan dưới dạng ion trong dung dịch. Những chất không tan hoặc không phân ly hoàn toàn thành ion được viết như trong phương trình tổng quát. Trở lại phương trình:</p>
            <p>2KI(aq) + Pb(NO₃)₂(aq)→ PbI₂(s) + 2KNO₃(aq).</p>
            <p>Đầu tiên viết các chất hòa tan dưới dạng ion trong dung dịch:</p>
            <img src={Congthuc14Chapter6} className="math-image" alt="Math Formula"/>
            <p>Tiếp theo, tìm các chất xuất hiện ở cả hai vế của phương trình với số lượng bằng nhau. Đây sẽ là các ion kali và ion nitrat. Các ion này xuất hiện giống hệt nhau ở cả hai vế của phương trình và chúng là các ion khán giả trong phản ứng. Những thứ này sẽ hủy bỏ và phản ứng ion ròng vẫn còn:</p>
            <img src={Congthuc15Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Vấn đề:</b></p>
            <p>Viết phản ứng ion thu gọn cho phản ứng sau:</p>
            <img src={Congthuc16Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Giải pháp: </b>Đầu tiên chúng ta viết ra tất cả các ion nước trong dung dịch cho các chất hòa tan:</p>
            <img src={Congthuc17Chapter6} className="math-image" alt="Math Formula"/>
            <p>Tiếp theo chúng ta thấy rằng các ion natri và nitrat xuất hiện ở cả hai phía của phương trình nên chúng sẽ triệt tiêu nhau và chúng ta thu được một phương trình ion rút gọn trông giống như:</p>
            <img src={Congthuc18Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Vấn đề:</b></p>
            <p>Viết phương trình ion rút gọn của phản ứng sau:</p>
            <img src={Congthuc19Chapter6} className="math-image" alt="Math Formula"/>
            <p><b>Giải pháp: </b>Mặc dù điều này có vẻ phức tạp nhưng các bước vẫn giống như trong hai ví dụ trước. Thực hiện từng bước một sẽ đảm bảo câu trả lời chính xác. Đầu tiên hãy viết các ion hòa tan trong dung dịch:</p>
            <img src={Congthuc20Chapter6} className="math-image" alt="Math Formula"/>
            <p>Các ion đóng vai trò là khán giả là ion ammonium và chloride. Chúng sẽ không xuất hiện trong phương trình ion rút gọn:</p>
            <img src={Congthuc21Chapter6} className="math-image" alt="Math Formula"/>
            </Panel>
            <Panel header="XII.Năng suất phần trăm" key="12" className='Panel'>
            <p>Đôi khi, mặc dù chúng tôi đo lường các chất phản ứng một cách cẩn thận nhưng chúng tôi không thu được đầy đủ lượng sản phẩm như mong đợi. Ví dụ, xét phản ứng
2H₂ + O₂ → 2H₂O. Nếu chúng ta phản ứng 4 gram H₂(g) (2 mol khí hydrogen) với 32 gram O₂(g) (một mol khí oxygen), chúng ta sẽ thu được 36 gram nước (2 mol nước). Điều này được quyết định rõ ràng bởi phản ứng cân bằng. Tuy nhiên, khi thu thập nước tạo thành, chẳng hạn, chúng ta thấy rằng chỉ có 34 gram nước được tạo thành. Bây giờ chúng ta có thể xem hiệu suất phần trăm của phản ứng này:</p>
            <img src={Congthuc22Chapter6} className="math-image" alt="Math Formula"/>
            <p>34 gram / 36 gram = 0.944</p>
            <p>0.944 × 100% = 94.4% năng suất.</p>
            </Panel>
            <Panel header="XIII. Xác định công thức hóa học" key="13" className='Panel'>
         

            </Panel>
            <Panel header="XIV. Phương pháp Stock" key="14" className='Panel'>
         
            </Panel>
          </Collapse>
        </div>
      </div>  
    );
  }

export default Chapter6thongtin;