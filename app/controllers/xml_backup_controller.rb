class XMLBackupController < ApplicationController
	require 'rexml/document'
	include REXML

	xmlfile = File.new("db.xml")
	xmldoc = Document.new(xmlfile)
	XPath.each(xmldoc,"//feed") do |feed|
		feed_title = XPath.match(feed,"//name/text()")
		feed_url = XPath.match(feed,"//url/text()")
		feed_content = XPath.match(feed,"//content/text()")
		@feed_new = Feed.create(:title => feed_title, :url => feed_url, :content => feed_content)
		XPath.each(feed, "//article") do |article|
			article_title = XPath.match(article,"//title/text()")
			article_img = XPath.match(article,"//img/text()")
			article_content = XPath.match(article,"//content/text()")
			@feed_new.articles.create(:title => article_title, :img => article_img, :content => article_content)
		end
	end
end