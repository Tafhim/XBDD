package xbdd.model.junit;

import xbdd.model.common.Tag;

import java.util.List;

public class JUnitFeature {
	private Integer line;
	private String name;
	private String description;
	private String id;
	private String keyword;
	private String uri;
	private List<JUnitElement> elements;
	private List<Tag> tags;

	public Integer getLine() {
		return line;
	}

	public void setLine(Integer line) {
		this.line = line;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public List<JUnitElement> getElements() {
		return elements;
	}

	public void setElements(List<JUnitElement> elements) {
		this.elements = elements;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
}
