require 'open-uri'
require 'rubygems'
require 'nokogiri'
  
  def bash
    page_n=788
    url = "http://bash.im"
    doc = Nokogiri::HTML(open(url))
    max_page = doc.css("a span , .page")[1].text
    while page_n <= max_page.to_i do 
	    url_c = "http://bash.im/index/"+page_n.to_s
      doc = Nokogiri::HTML(open(url_c))
      puts title = "--------"
      puts content = doc.css(".text")[0].text
      puts date = doc.css(".date")[0].text
      puts url_c 
      page_n+=1
    end
  end   
bash
