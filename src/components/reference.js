import React from 'react';
import './reference.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;

function Reference() {
  return (
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Reference</h2>
        </div>
        <Collapse defaultActiveKey={['1']} size="large">
          <Panel header="1. Analytical Chemistry" key="1" className='Panel'>
            <p>1.1. Kealey, D., & Haines, P. J. (2002). Analytical chemistry. BIOS Scientific Publishers.</p>
            <p>1.2. Christian, G. D., Dasgupta, P. K., & Schug, K. A. (2014). Analytical chemistry (7th ed.). John Wiley & Sons.</p>
            <p>1.3. Kenkel, J. (1992). Analytical chemistry refresher manual. Lewis Publishers.</p>
            <p>1.4. Kenkel, J. (2002). Analytical chemistry for technicians (3rd ed.). CRC Press.</p>
            <p>1.5. Tissue, B. M. (2023). Basics of analytical chemistry and chemical equilibria: A quantitative approach (2nd ed.). John Wiley & Sons.</p>
            <p>1.6. Valcárcel Cases, M., López-Lorente, Á. I., & López-Jiménez, M. Á. (2018). Foundations of analytical chemistry: A teaching–learning approach. Springer International Publishing.<a href='https://doi.org/10.1007/978-3-319-62872-1'>Link</a></p>
            <p>1.7. Harvey, D. (2000). Modern analytical chemistry. McGraw-Hill.</p>
            <p>1.8. Fifield, F. W., & Kealey, D. (2000). Principles and practice of analytical chemistry. Blackwell Science.</p>
          </Panel>
          <Panel header="2. Application Chemistry" key="2" className='Panel'>
            <p>2.1. Gilbert, K. & Prusa, K. (2021). Food product development. Ames, IA: Iowa State University Digital Press. DOI:<a href='https://doi.org/10.31274/isudp.2021.66'>Link</a></p>
            <p>2.2. Buckeridge, M. S., & De Souza, A. P. (Eds.). (2017). Advances of basic science for second generation bioethanol from sugarcane. Springer.<a href='https://doi.org/10.1007/978-3-319-49826-3'>Link</a></p>
            <p>2.3. Shargel, L., & Yu, A. B. C. (Eds.). (2016). Applied biopharmaceutics & pharmacokinetics (7th ed.). McGraw-Hill Education. ISBN 978-0-07-182964-9</p>
            <p>2.4. Tinkler, C. K., & Masters, H. (Eds.). (n.d.). Applied chemistry: A practical handbook for students of household science and public health (2nd ed.). King's College of Household and Social Science.</p>
            <p>2.5. Adlakha, N., Bhatnagar, R., & Yazdani, S. S. (Eds.). (2022). Biomass for bioenergy and biomaterials. CRC Press.</p>
            <p>2.6. Wallace, J. S. (2018). Chemical analysis of firearms, ammunition, and gunshot residue (2nd ed.). CRC Press.</p>
            <p>2.7. Am Ende, D. J., & Am Ende, M. T. (Eds.). (2019). Chemical engineering in the pharmaceutical industry: Active pharmaceutical ingredients (2nd ed.). John Wiley & Sons, Inc.</p>
            <p>2.8. Am Ende, M. T., & Am Ende, D. J. (Eds.). (2019). Chemical engineering in the pharmaceutical industry: Drug product design, development, and modeling (2nd ed.). John Wiley & Sons, Inc.</p>
            <p>2.9. Lagowski, J. J. (Ed.). (2004). Chemistry: Foundations and applications (Vols. 1-4). Macmillan. ISBN 0-02-865721-7</p>
            <p>2.10. Rodriguez-Velazquez, S. (2016). Chemistry of cooking. Elsevier.</p>
            <p>2.11. Tyrell, J. A. (2014). Fundamentals of industrial chemistry: Pharmaceuticals, polymers, and business. John Wiley & Sons, Inc. ISBN 978-1-118-61756-4</p>
            <p>2.12 Chaudhuri, U. R. (2010). Fundamentals of petroleum and petrochemical engineering. CRC Press.</p>
            <p>2.13. Lofrano, G. (Ed.). (2012). Green technologies for wastewater treatment: Energy recovery and emerging compounds removal. CRC Press.</p>
            <p>2.14. Rowell, R. M. (Ed.). (1992). Handbook of wood chemistry and wood composites. CRC Press. ISBN 0-8493-1588-3</p>
            <p>2.15. Corbo, P., Migliardini, F., & Veneri, O. (2011). Hydrogen fuel cells for road vehicles. Elsevier.</p>
            <p>2.16. Bertucco, A., & Vetter, G. (Eds.). (2001). High pressure process technology: Fundamentals and applications. Springer.</p>
            <p>2.17. Basile, A., & Dalena, F. (Eds.). (n.d.). Methanol: Science and engineering. Elsevier.</p>
            <p>2.18. Cooper, R., & Nicola, G. (2015). Natural products chemistry: Sources, separations, and structures. Elsevier.</p>
            <p>2.19. Schubiger, P. A., Lehmann, L., & Friebe, M. (Eds.). (2007). PET chemistry: The driving force in molecular imaging. Springer.</p>
            <p>2.20. Mann, U. (2009). Principles of chemical reactor analysis and design: New tools for industrial chemical reactor operations (2nd ed.). John Wiley & Sons, Inc.</p>
            <p>2.21. Pybus, D., & Sell, C. (Eds.). (1999). The chemistry of fragrances. The Royal Society of Chemistry.</p>
            <p>2.22. Alcock, C. B. (2000). Thermochemical processes: Principles and models. Elsevier.</p>
          </Panel>
          <Panel header="3. Biochemistry" key="3" className='Panel'>
            <p>3.1. Pakay, J., Duivenvoorden, H., Shafee, T. & Clarke, K. (2023). Threshold Concepts in Biochemistry. La Trobe eBureau.</p>
            <p>3.2. Wiley Publishing, Inc. (2008). Biochemistry for Dummies®. Wiley Publishing, Inc.</p>
            <p>3.3. Crichton, R. R., Lallemand, F., Psalti, I. S. M., & Ward, R. J. (2008). Biological Inorganic Chemistry: An Introduction. Elsevier.</p>
            <p>3.4. Nissen, P., & Nyborg, J. (2008). EF-G and EF-Tu structures and translation elongation in bacteria. University of Aarhus.</p>
            <p>3.5. Schmitz, A. (2012). Introduction to Chemistry: General, Organic, and Biological v. 1.0.</p>
          </Panel>
          <Panel header="4. Chromatography" key="4" className='Panel'>
            <p>4.1. Heftmann, E. (Ed.). (2004). Chromatography: Fundamentals and applications of chromatography and related differential migration methods (6th ed.), Part B: Applications. Elsevier B.V.</p>
          </Panel>
          <Panel header="5. Computational" key="5" className='Panel'>
            <p>5.1. Devaney, K. J., Hango, C. R., Lu, J., & Sigalovsky, D. (n.d.). Computational Chemistry in the High School Classroom.</p>
            <p>5.2. Holtje, H.-D., & Folkers, G. (1997). Molecular Modeling: Basic Principles and Applications. VCH Verlagsgesellschaft mbH.</p>
            <p>5.3. Mannhold, R., Kubinyi, H., & Timmerman, H. (Eds.). (1996). Methods and Principles in Medicinal Chemistry. VCH Verlagsgesellschaft mbH.</p>
          </Panel>
          <Panel header="6. Environmental Chemistry" key="6" className='Panel'>
            <p>6.1. Ramanathan, V. (2019). Bending the curve: Climate change solutions. MIT Press.</p>
            <p>6.2. Hutzinger, O., Barceló, D., & Kostianoy, A. (Eds.). (2009). Contaminated sediments. Springer.</p>
            <p>6.3. Manahan, S. E. (2000). Environmental chemistry (7th ed.). CRC Press.</p>
            <p>6.4. Manahan, S. E. (2010). Environmental chemistry (8th ed.). CRC Press.</p>
            <p>6.5. Lichtfouse, E. (Ed.). (2005). Environmental chemistry. Springer.</p>
            <p>6.6. Gothandam, K. M. (2018). Environmental chemistry for a sustainable world. Springer.</p>
            <p>6.7. Frankenberger, W. T., & Engberg, R. A. (1998). Environmental chemistry of selenium. CRC Press.</p>
            <p>6.8. Montgomery, J. H. (2000). Environmental chemicals desk reference. CRC Press.</p>
            <p>6.9. (2020). Global anthropogenic non-CO2 greenhouse gas emissions: 1990-2020. International Energy Agency.</p>
            <p>6.10. Manahan, S. E. (2005). Green chemistry and the ten commandments of sustainability. CRC Press.</p>
            <p>6.11. Lucia, L. (2015). Key principles of green chemistry. Springer.</p>
            <p>6.12. Hester, R. E., & Harrison, R. M. (Eds.). (1994). Waste incineration and the environment (Vol. 2). Royal Society of Chemistry.</p>
          </Panel>
          <Panel header="7. Experimental Chemistry" key="7" className='Panel'>
            <p>7.1. Rouessac, F. (1992). Chemical analysis: Modern instrumentation methods and techniques. Wiley.</p>
            <p>7.2. Walker, P., & Wood, E. (2011). Chemistry experiments. Prentice Hall.</p>
            <p>7.3. Albert, D. R. (2006). Chemistry: Techniques and explorations: An introductory chemistry laboratory manual (1st ed.). Thomson Brooks/Cole.</p>
            <p>7.4. Weiner, S. A., & Harrison, B. (2007). Introduction to chemical principles (7th ed.). Pearson Education.</p>
            <p>7.5. Bauer, R. C., & Birk, J. P. (2009). Laboratory inquiry in chemistry (3rd ed.). McGraw-Hill.</p>
            <p>7.6. Robert, B., & Lazarus, H. (1960). The golden book of chemistry experiments. Golden Press.</p>
          </Panel>
          <Panel header="8. Food" key="8" className='Panel'>
            <p>8.1. Gilbert, K. & Prusa, K. (2021). Food product development. Ames, IA: Iowa State University Digital Press.</p>
            <p>8.2. Ashurst, P. R. (2016). Chemistry and technology of soft drinks and fruit juices (3rd ed.). Wiley-Blackwell.</p>
            <p>8.3. Newton, D. E. (2007). Food chemistry. Springer.</p>
            <p>8.4. Belitz, H. D., Grosch, W., & Schieberle, P. (2009). Food chemistry (4th ed., revised and extended). Springer.</p>
            <p>8.5. Fennema, O. R. (1996). Food chemistry (3rd ed.). Marcel Dekker.</p>
            <p>8.6. Akoh, C. C., & Min, D. B. (2002). Food lipids: Chemistry, nutrition, and biotechnology (2nd ed., revised and expanded). CRC Press.</p>
            <p>8.7. Prusa, K., & Gilbert, K. (Eds.). Food product development lab manual. (No publication year provided).</p>
          </Panel>
        <Panel header="9. General Chemistry" key="9" className='Panel'>
        <p>9.1. Burdge, J. R. (Author). Chemistry 5e. (Publisher not provided).</p>
        <p>9.2. Tro, N. J. (Author). Chemistry: A Molecular Approach (5th ed.). Pearson.</p>
        <p>9.3. Flowers, P. (Author). Chemistry: Atoms First (2nd ed.). (Publisher not provided).</p>
        <p>9.4. McMurry, J. E. (2008). Chemistry (7th ed.). Brooks/Cole.</p>
        <p>9.5. Whitten, K. W., & Davis, R. E. (2004). Chemistry (10th ed.). Brooks/Cole.</p>
        <p>9.6. Lewis, R., & Evans, W. (Author). Chemistry. (Publisher not provided).</p>
        <p>9.7. Zumdahl, S. S. (2007). Chemistry (7th ed.). Houghton Mifflin.</p>
        <p>9.8. (Author not provided). (2010). Chemistry Essentials for Dummies. Wiley.</p>
        <p>9.9. Lagowski, J. J., & D.J. (2004). Chemistry: Foundations and Applications.</p>
        <p>9.10. Adams, D. J. (2004). Chemistry in Alternative Reaction Media. Wiley.</p>
        <p>9.11. Cotton, S. A. (1997). Chemistry of Precious Metals.</p>
        <p>9.12. Greenwood, N. N., & Earnshaw, A. (2002). Chemistry of the Elements (2nd ed.). Elsevier.</p>
        <p>9.13. Tro, N. J. (2008). Chemistry: Structure and Properties (2nd ed.). Pearson.</p>
        <p>9.14. Lo, G. V., & Janusa, M. A. (2010). Chemistry: The Core Concepts.</p>
        <p>9.15. Silberberg, M. S., & Amateis, P. G. (2012). Chemistry: The Molecular Nature of Matter and Change (9th ed.). McGraw-Hill.</p>
        <p>9.16. Silberberg, M. (2012). Chemistry: The Molecular Nature of Matter and Change with Advanced Topics. McGraw-Hill.</p>
        <p>9.17. (Author not provided). (2017). Edexcel A-level Chemistry Student Guide: Practical Chemistry.</p>
        <p>9.18. (Author not provided). Eyewitness Elements. DK.</p>
        <p>9.19. Goldberg, D. E. (2010). Fundamentals of Chemistry (5th ed.). Pearson.</p>
        <p>9.20. (2018). GCSE Chemistry Practicals Handbook.</p>
        <p>9.21. (2019). General Chemistry: Principles, Patterns, and Applications.</p>
        <p>9.22. (Author not provided). Handbook of Chemistry. Arihant.</p>
        <p>9.23. Nhà xuất bản Đại học Quốc Gia TP.HCM. (n.d.). Hoá Đại Cương. Đại học Quốc Gia TP.HCM.</p>
        <p>9.24. Đại học Sư Phạm TP.HCM. (n.d.). Hóa Học Lập Thể. Đại học Sư Phạm TP.HCM.</p>
        <p>9.25. Ball, D., & Key, J. (2014). Introductory Chemistry: 1st Canadian Edition.</p>
        <p>9.26. Corwin, C. H. (2018). Introductory Chemistry: Concepts and Critical Thinking (8th ed.). Pearson.</p>
        <p>9.27. Adeyiga, A. M. (2006). Laboratory Manual: General Chemistry I Honors.</p>
        <p>9.28. Dean, J. A. (1999). Lange's Handbook of Chemistry (15th ed.). McGraw-Hill.</p>
        <p>9.29. Cotton, S. (2006). Lanthanide and Actinide Chemistry. Wiley.</p>
        <p>9.30. Sharma, S. (n.d.). Master Resource Book for JEE Main Chemistry. (Publisher not provided).</p>
        <p>9.31. Aldridge, C. (2009). McGraw-Hill’s SAT Subject Test: Chemistry (2nd ed.). McGraw-Hill.</p>
        <p>9.32. Basile, A. (2018). Methanol: Science and Engineering. Elsevier.</p>
        <p>9.33. (Author not provided). NCERT Exemplar Problem Solutions: Chemistry. NCERT.</p>
        <p>9.34. (Author not provided). Periodic Table Facts at Your Fingertips. DK.</p>
        <p>9.35. (Author not provided). Rocks and Minerals: Facts at Your Fingertips. DK.</p>
        <p>9.36. Aldridge, C. (2010). SAT Subject Test Chemistry (10th ed.). McGraw-Hill.</p>
        <p>9.37. Lower, S. K. (n.d.). Solutions. (Publisher not provided).</p>
        <p>9.38. (Author not provided). Solved Papers: Chemical Sciences. Pratiyogita Darpan.</p>
        <p>9.39. Glencoe Science. (n.d.). Solving Problems: A Chemistry Handbook. (Publisher not provided).</p>
        <p>9.40. Olah, G. A. (2009). Superacid Chemistry (2nd ed.). Wiley.</p>
        <p>9.41. DK. (n.d.). The Elements Book: A Visual Encyclopedia of the Periodic Table. DK.</p>
        <p>9.42. Ball, D. W. (n.d.). The Basics of General, Organic, and Biological Chemistry. (Publisher not provided).</p>
        <p>9.43. Mahan, B. H. (n.d.). University Chemistry. (Publisher not provided).</p>
        <p>9.44. Franks, F. (n.d.). Water: A Matrix of Life. (Publisher not provided).</p>
        </Panel>

        <Panel header="10. Inorganic Chemistry" key="10" className='Panel'>
        <p>10.1. Applied Inorganic Chemistry. (2023). Volume 1: From Construction Materials to Technical Gases.</p>
        <p>10.2. McCleverty, J. A. (Ed.). (2012). Comprehensive coordination chemistry II: From biology to nanotechnology (Vol. 5). Elsevier.</p>
        <p>10.3. House, J. E. (2010). Descriptive inorganic chemistry. Elsevier.</p>
        <p>10.4. Strohfeldt, K. A. (2015). Essentials of inorganic chemistry. Wiley.</p>
        <p>10.5. Viswanatha, C. (2015). Fundamental concepts of inorganic chemistry.</p>
        <p>10.6. Shriver, D. F., & Atkins, P. W. (2010). Inorganic chemistry (5th ed.). Oxford University Press.</p>
        <p>10.7. Housecroft, C. E., & Sharpe, A. G. (2012). Inorganic chemistry (2nd ed.). Pearson.</p>
        <p>10.8. Housecroft, C. E., & Sharpe, A. G. (2018). Inorganic chemistry (4th ed.). Pearson.</p>
        <p>10.9. Miessler, G. L., Fischer, P. J., & Tarr, D. A. (2018). Inorganic chemistry (5th ed.). Pearson.</p>
        <p>10.10. Instant Notes. (2000). Inorganic chemistry (2nd ed.). Garland Science.</p>
        <p>10.11. House, J. E. (2008). Inorganic chemistry. Elsevier.</p>
        <p>10.12. Zanello, P. (2003). Inorganic electrochemistry: Theory, practice, and application. Springer.</p>
        <p>10.13. Tandon, O. P. (n.d.). Inorganic chemistry.</p>
        <p>10.14. Jordan, R. B. (2007). Reaction mechanisms of inorganic and organometallic systems (3rd ed.). Wiley.</p>
        </Panel>
        <Panel header="11. MPDI" key="11" className='Panel'>
        <p>11.1. MDPI. (n.d.). Various articles from MDPI journals including Chemistry and Biochemistry. Retrieved from <a href="https://www.mdpi.com">https://www.mdpi.com</a> [Các bài báo được trích dẫn từ các tạp chí của MDPI, các quyền sử dụng được cấp theo giấy phép Creative Commons].</p>
        </Panel>
        <Panel header="12. Medicinal Chemistry" key="12" className='Panel'>
        <p>12.1. Harrold, M. (2023). Basic concepts in medicinal chemistry (3rd ed.). [Publisher information if available].</p>
        <p>12.2. Am Ende, M. T. (Ed.). (Year). Chemical engineering in the pharmaceutical industry (2nd ed.). [Publisher information if available].</p>
        <p>12.3. Sarker, S. D. (2007). Chemistry for pharmacy students: General, organic, and natural product chemistry. Elsevier.</p>
        <p>12.4. Newton, D. E. (2007). Chemistry of drugs. [Publisher information if available].</p>
        <p>12.5. Arneson, W. (2007). Clinical chemistry: A laboratory perspective. [Publisher information if available].</p>
        <p>12.6. Buxbaum, E. (2015). Fundamentals of protein structure and function (2nd ed.). [Publisher information if available].</p>
        <p>12.7. Thomas, G. (2007). Medicinal chemistry. [Publisher information if available].</p>
        <p>12.8. Dingermann, T. (Ed.). (Vol. 21). Molecular biology in medicinal chemistry. [Publisher information if available].</p>
        <p>12.9. Roy, K. (2019). Multi-target drug design using chem-bioinformatic approaches. [Publisher information if available].</p>
        <p>12.10. Hickey, A. J. (Ed.). (2010). Pharmaceutical process engineering (2nd ed.). [Publisher information if available].</p>
        <p>12.11. Kinghorn, A. D. (2017). Phytocannabinoids: Unraveling the complex chemistry and pharmacology of Cannabis sativa. [Publisher information if available].</p>
        <p>12.12. Ikan, R. (2008). Selected topics in the chemistry of natural products.</p>
        <p>12.13. Madsen, U. (Ed.). (2002). Textbook of drug design and discovery.</p>
        <p>12.14. Nicholson, J. W. (2002). The chemistry of medical and dental materials.</p>
        <p>12.15. Watson, W. S., & McCall, M. (1991). Vitamin C: Its chemistry and biochemistry.</p>
        </Panel>
        <Panel header="13. Microbiology" key="13" className='Panel'>
        <p>13.1. Tortora, G. J. (2019). Microbiology: An introduction (13th ed.). Pearson.</p>
        </Panel>
        <Panel header="14. Nanotechnology" key="14" className='Panel'>
        <p>14.1. Pradeep, T. (2007). Nano: The Essentials. Tata McGraw-Hill Education.</p>
        <p>14.2. Kharisov, B. I. (2014). Nanomaterials for Environmental Protection. Elsevier.</p>
        <p>14.3. Astruc, D. (2008). Nanoparticles and Catalysis (Vol. 1). Wiley-VCH.</p>
        <p>14.4. Klabunde, K. J. (2001). Nanoscale Materials in Chemistry. Wiley-Interscience.</p>
        <p>14.5. Cerofolini, G. (2009). NanoScience and Technology: Nanoscale Devices. Springer.</p>
        <p>14.6. Sellers, K. (2009). Nanotechnology and the Environment. Wiley-Interscience.</p>
        </Panel>
        <Panel header="15. Organic Chemistry" key="15" className='Panel'>
        <p>15.1. Crabtree, R. H. (2005). The Organometallic Chemistry of the Transition Metals. Wiley-Interscience.</p>
        <p>15.2. Joule, J. A., & Mills, K. (Eds.). (1996). The Chemistry of Heterocyclic Compounds, Supplement I: Chemistry of Heterocyclic Compounds: A Series of Monographs (Vol. 58). Wiley.</p>
        <p>15.3. Wade, L. G. (2005). Student Study Guide and Solutions Manual to accompany Organic Chemistry (2nd ed.). Pearson Prentice Hall.</p>
        <p>15.4. Nasipuri, D. (1994). Stereochemistry of Organic Compounds (2nd ed.). Wiley Eastern.</p>
        <p>15.5. Tanaka, K. (2009). Solvent-Free Organic Synthesis (2nd ed.). Wiley-VCH.</p>
        <p>15.6. Francis, A., & Janice, M. (2014). Reactions and Syntheses in the Organic Chemistry Laboratory. McGraw-Hill.</p>
        <p>15.7. Smith, J. A. (2004). Oxidation of Alcohols to Aldehydes and Ketones: A Guide to Current Common Practice. Wiley.</p>
        <p>15.8. Knipe, A. C. (2006). Organic Reaction Mechanisms. Wiley.</p>
        <p>15.9. Vollhardt, P. C. W., & Schore, N. E. (2011). Organic Chemistry: Structure and Function (7th ed.). W. H. Freeman and Company.</p>
        <p>15.10. Liu, X. (2014). Organic Chemistry I. Academic Press.</p>
        <p>15.11. Klein, D. R. (2017). Organic Chemistry I (2nd ed.). Wiley.</p>
        <p>15.12. Solomons, T. W. G. (2014). Organic Chemistry (12th ed.). Wiley.</p>
        <p>15.13. Clayden, J., Greeves, N., & Warren, S. (2012). Organic Chemistry. Oxford University Press.</p>
        <p>15.14. Klein, D. R. (2017). Organic Chemistry (3rd ed.). Wiley.</p>
        <p>15.15. McMurry, J. (2011). Organic Chemistry (10th ed.). Cengage Learning.</p>
        <p>15.16. Li, J. J. (2010). Name Reactions: A Collection of Detailed Reaction Mechanisms (3rd ed.). Springer.</p>
        <p>15.17. Bruckner, R. (2013). Molecular Rearrangements in Organic Synthesis. Wiley.</p>
        <p>15.18. Carruthers, W., & Coldham, I. (2011). Modern Methods of Organic Synthesis (4th ed.). Cambridge University Press.</p>
        <p>15.19. Joule, J. A., & Mills, K. (2010). Heterocyclic Chemistry (5th ed.). Wiley-Blackwell.</p>
        <p>15.20. McMurry, J. (2011). Fundamentals of Organic Chemistry (7th ed.). Brooks/Cole.</p>
        <p>15.21. Roberts, J. D. (2007). Basic Principles of Organic Chemistry (2nd ed.). W.A. Benjamin.</p>
        <p>15.22. Gupta, B. D., & Elias, A. J. (2014). Basic Organometallic Chemistry: Concepts, Syntheses, and Applications (2nd ed.). Wiley.</p>
        <p>15.23. Vančik, H. (2009). Basic Organic Chemistry for the Life Sciences. Elsevier.</p>
        <p>15.24. Mortier, J. (2003). Arene Chemistry. Wiley.</p>
        <p>15.25. Leonard, J. (2010). Advanced Practical Organic Chemistry. CRC Press.</p>
        <p>15.26. Bruckner, R. (2008). Advanced Organic Chemistry: Reaction Mechanisms. Wiley-VCH.</p>
        <p>15.27. Carey, F. A., & Sundberg, R. J. (2007). Advanced Organic Chemistry: Structure and Mechanisms (5th ed.). Springer.</p>
        <p>15.28. Carey, F. A. (2008). Advanced Organic Chemistry (5th ed.). Springer.</p>
        </Panel>
        <Panel header="16. Physical Chemistry" key="16" className='Panel'>
        <p>16.1. Silbey, R. J., Alberty, R. A., & Bawendi, M. G. (2004). Physical chemistry. Wiley.</p>
        <p>16.2. Ladd, M. (2000). Introduction to physical chemistry (3rd ed.). Wiley.</p>
        <p>16.3. Madan, R. L. (n.d.). Physical chemistry. S. Chand Publishing.</p>
        <p>16.4. Mortimer, R. G. (2005). Physical chemistry (3rd ed.). Academic Press.</p>
        <p>16.5. Moore, W. J. (n.d.). Physical chemistry (6th ed.). Prentice Hall.</p>
        <p>16.6. Atkins, P., & de Paula, J. (2010). Physical chemistry for the life sciences (2nd ed.). Oxford University Press.</p>
        <p>16.7. Bahl, A., & Bahl, B. S. (2005). Essentials of physical chemistry (23rd ed.). S. Chand Publishing.</p>
        <p>16.8. Oladebeye, A. (n.d.). Fundamentals of general and physical chemistry. (Edition not available).</p>
        <p>16.9. Ball, D. W. (2002). Physical chemistry (6th ed.). Brooks/Cole.</p>
        <p>16.10. Haynes, W. M. (Ed.). (2014). CRC handbook of chemistry and physics: A ready-reference book of chemical and physical data (95th ed.). CRC Press.</p>
        <p>16.11. Kuno, M. (n.d.). Chem 322, Physical chemistry II: Lecture notes.</p>
        <p>16.12. Lyons, M. (2012). Introduction to physical chemistry: Properties of gases, basic thermodynamics.</p>
        <p>16.13. Castellan, G. W. (2004). Physical chemistry (3rd ed.). Addison-Wesley.</p>
        <p>16.14. Atkins, P., & de Paula, J. (2006). Physical chemistry (8th ed.). Oxford University Press.</p>
        <p>16.15. Atkins, P., & de Paula, J. (2014). Physical chemistry (9th ed.). Oxford University Press.</p>
        <p>16.16. Levine, I. N. (2009). Physical chemistry (5th ed.). McGraw-Hill.</p>
        </Panel>
        <Panel header="17. Quantum Chemistry" key="17" className='Panel'>
        <p>17.1. Lvovsky, A. I. Quantum Physics: An Introduction Based on Photons.</p>
        <p>17.2. Hayward, D. O. Quantum Mechanics for Chemists.</p>
        <p>17.3. Engel, T. Quantum Chemistry & Spectroscopy.</p>
        <p>17.4. Parker, J. E. Chemistry, Quantum Mechanics, and Spectroscopy II.</p>
        </Panel>
        <Panel header="18. SAT Subject Test Chemistry" key="18" className='Panel'>
        <p>18.1. Aldridge, C. (2019). SAT Subject Test Chemistry (10th ed.). Kaplan Publishing.</p>
        <p>18.2. Mascetta, J. A. (2019). SAT Subject Test Chemistry. Barron's Educational Series.</p>
        <p>18.3. Mascetta, J. A. (2020). Barron's SAT Subject Test Chemistry (11th ed.). Barron's Educational Series.</p>
        <p>18.4. Princeton Review. (2020). Cracking the SAT Subject Test in Chemistry (16th ed.). The Princeton Review.</p>
        <p>18.5. McGraw-Hill Education. (2018). McGraw-Hill Education SAT Subject Test Chemistry (5th ed.). McGraw-Hill Education.</p>
        <p>18.6. Barron's Educational Series. (Year of publication). Barron's SAT Subject Test Chemistry. Barron's Educational Series.</p>
        </Panel>
        <Panel header="19. Spectroscopy" key="19" className='Panel'>
        <p>19.1. Engel, T. (Year). Quantum Chemistry & Spectroscopy. Publisher.</p>
        <p>19.2. Schubiger, P. A. (Year). PET Chemistry: The Driving Force in Molecular Imaging. Publisher.</p>
        <p>19.3. Kemp, W. (2007). Organic Spectroscopy (3rd ed.). Palgrave Macmillan.</p>
        <p>19.4. Yadav, L. D. S. Organic Spectroscopy.</p>
        <p>19.5. Hollas, J. M. Modern Spectroscopy.</p>
        <p>19.6. Mass Spectrometry: A Textbook.</p>
        <p>19.7. Sharma, Y. R. Elementary Organic Spectroscopy: Principles and Chemical Applications (5th ed., Rev. ed.).</p>
        <p>19.8. Beaty, R. D., & Kerber, J. D. Concepts, Instrumentation, and Techniques in Atomic Absorption Spectrophotometry (2nd ed.).</p>
        <p>19.9. Parker, J. E. Chemistry, Quantum Mechanics, and Spectroscopy II.</p>
        <p>19.10. Macomber, R. S. A Complete Introduction to Modern NMR Spectroscopy.</p>
        </Panel>
        <Panel header="20. ScienceDirect" key="20" className='Panel'>
        <p>20.1. ScienceDirect articles accessed for research purposes via the Elsevier platform. Accessed from <a href="https://www.sciencedirect.com">https://www.sciencedirect.com</a>.</p>
        </Panel>
        <Panel header="21. Vietnamese Journals" key="21" className='Panel'>
        <p>21.1. Vietnam Journal of Chemistry. (n.d.). Articles retrieved from Vietnam Journal of Chemistry <a href="https://vjs.ac.vn/vjchem">https://vjs.ac.vn/vjchem</a>. Accessed December 1, 2024.</p>
        <p>21.2. Vietnam Journal Online. (n.d.). Tài liệu nghiên cứu khoa học. Truy cập từ <a href="https://vjol.info.vn/">https://vjol.info.vn/</a>.</p>
        </Panel>
        <Panel header="22. Vietnamese Textbooks" key="22" className='Panel'>
        <p>22.1. Cao Cự Giác (Chủ biên), Đặng Thị Thuận An, Lê Hải Đăng, Nguyễn Đình Độ, Đậu Xuân Đức, Nguyễn Xuân Hồng Quân, & Phạm Ngọc Tuấn. (n.d.). Sách giáo khoa Hóa học Chân Trời Sáng Tạo. Nhà xuất bản Giáo dục Việt Nam.</p>
        <p>22.2. Lê Kim Long (Tổng chủ biên), Đặng Xuân Thư (Chủ biên), Nguyễn Đăng Đạt, Lê Thị Hồng Hải, Nguyễn Văn Hải, Đường Khánh Linh, & Trần Thị Như Mai. (n.d.). Sách giáo khoa Hóa học Kết nối tri thức với cuộc sống. Nhà xuất bản Giáo dục Việt Nam.</p>
        <p>22.3. Trần Thành Huế (Tổng chủ biên), Vũ Quốc Trung (Chủ biên), Nguyễn Tiến Công, Nguyễn Ngọc Hà, & Dương Bá Vũ. (n.d.). Sách giáo khoa Hóa học Cánh Diều. Nhà xuất bản Giáo dục Việt Nam.</p>
        </Panel><Panel header="Cam kết quyền sử dụng" key="23" className='Panel'>
        <div className="commitment-document">
          <h4>Cam kết sử dụng tài liệu trong nghiên cứu AI</h4>
          <p><strong>Chúng tôi, FiveC, cam kết:</strong></p>
          
          <h5>I. Mục đích sử dụng</h5>
          <ul>
            <li>Tất cả tài liệu được thu thập và sử dụng chỉ nhằm mục đích nghiên cứu khoa học và huấn luyện trí tuệ nhân tạo (AI).</li>
            <li>Tuyệt đối không sử dụng tài liệu cho mục đích thương mại hoặc vi phạm quyền sở hữu trí tuệ của các bên liên quan.</li>
          </ul>
          
          <h5>II. Tuân thủ pháp luật</h5>
          <ul>
            <li>Chúng tôi tuân thủ đầy đủ các quy định tại Điều 25, Luật Sở hữu trí tuệ số 50/2005/QH11 (đã được sửa đổi, bổ sung bởi Luật số 07/2022/QH15).</li>
            <li>Cam kết ghi nhận đầy đủ thông tin về tác giả, tổ chức sở hữu tài liệu và nguồn gốc, xuất xứ của các tài liệu được sử dụng.</li>
          </ul>
          
          <h5>III. Bảo mật và lưu trữ</h5>
          <ul>
            <li>Tài liệu được bảo mật tuyệt đối và chỉ các thành viên tham gia nghiên cứu mới có quyền truy cập.</li>
            <li>Không công khai, chia sẻ hoặc phát tán tài liệu ra bên ngoài khi chưa có sự đồng ý từ bên sở hữu bản quyền.</li>
          </ul>
          
          <h5>IV. Trách nhiệm pháp lý</h5>
          <ul>
            <li>Chúng tôi chịu hoàn toàn trách nhiệm trước pháp luật nếu xảy ra bất kỳ vi phạm nào liên quan đến quyền sở hữu trí tuệ.</li>
            <li>Nếu bạn có thắc mắc hoặc khiếu nại, vui lòng liên hệ với chúng tôi qua email: fivecreatorsgroup@gmail.com.</li>
          </ul>
          
          <p>Trân trọng,</p>
          <p>FiveC</p>
        </div>
        
        </Panel>
        </Collapse>
      </div>
    </div>  
  );
}

export default Reference;